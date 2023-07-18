import {
	Box,
	Button,
	Flex,
	FormLabel,
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	useColorModeValue,
	ModalFooter,
	ModalOverlay,
	Text,
	Textarea,
	useDisclosure,
	Input,
	Center,
	Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsArrowUpRight, BsHeartFill, BsHeart } from "react-icons/bs";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

type FeedbackProps = {
	//Wallet adddress of mentee
	// open: boolean;
	// //callback function that doesn't return anything
	// handleClose: () => void;
};

fcl.config({
	//Emulator
	"accessNode.api": "http://localhost:8888",
	"app.detail.title": "Sharayu's Flow Wallet",

	//wallet to interact with emulator
	"discovery.wallet": "http://localhost:8701/fcl/authn",
	"0xMentorMentee": "0xf8d6e0586b0a20c7",
});

const Feedback: React.FC<FeedbackProps> = () => {
	const [review, setReview] = useState("");
	const [rating, setRating] = useState("");
	const [liked, setLiked] = useState(false);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);

	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [showFailureMessage, setShowFailureMessage] = useState(false);
	//TO-DO
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// const { error } = "hi";

		let error = true;

		if (error) {
			console.log(error);
			setShowSuccessMessage(false);
			setShowFailureMessage(true);

			return;
		}

		setShowSuccessMessage(true);
		setShowFailureMessage(false);
	};

	const giveFeedback = async (e: React.FormEvent) => {
		e.preventDefault();

		const txId = await fcl.send([
			fcl.transaction`    
                import MentorMentee from 0xMentorMentee
                transaction(id: Int, name: String, rating: Int) {

                prepare(acc: AuthAccount) {}
      
                execute {
                    MentorMentee.giveFeedback(id: id, name: name, rating: rating)
                }
            }
            `,
			fcl.args([fcl.arg(0, t.Int), fcl.arg("tushar", t.String), fcl.arg(5, t.Int)]),
			fcl.proposer(fcl.authz),
			fcl.payer(fcl.authz),
			fcl.authorizations([fcl.authz]),
		]);
        onClose();
	};

	return (
		<>
			<Button bg="black" onClick={onOpen} w="10px">
				<Flex
					p={4}
					alignItems="center"
					justifyContent={"space-between"}
					roundedBottom={"sm"}
					borderLeft={"1px"}
					cursor="pointer"
					onClick={() => setLiked(!liked)}>
					{liked ? (
						<BsHeartFill fill="red" fontSize={"24px"} />
					) : (
						<BsHeart fontSize={"24px"} />
					)}
				</Flex>
			</Button>

			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<Flex bg="brand.300" color={"black"} justifyContent={"center"} p={5}>
						<Heading fontSize={25}>Schedule a Meet</Heading>
					</Flex>

					<ModalCloseButton color={"white"} />
					<ModalBody pb={6}>
						<Box p={1} mt={5}>
							<form onSubmit={giveFeedback}>
								<Flex justifyContent={"space-between"}>
									<Stack>
										<FormLabel>Add Review</FormLabel>
										<Input
											placeholder="Add Review"
											size="md"
											name="review"
											value={review}
											onChange={(e) => setReview(e.target.value as string)}
											type="string"
										/>

										<FormLabel>Add Rating</FormLabel>
										<Input
											placeholder="Add Rating"
											size="md"
											name="rating"
											value={rating}
											onChange={(e) => setRating(e.target.value)}
											type="number"
										/>
										<Flex mt={5} justifyContent={"flex-end"}>
											<Button type="submit" colorScheme="blue" mr={3}>
												Send Review
											</Button>
											<Button onClick={onClose} bg={"red.500"}>
												Cancel
											</Button>
										</Flex>
									</Stack>
								</Flex>
							</form>
						</Box>
					</ModalBody>

					<ModalFooter>
						<Stack>
							<Box>
								{showSuccessMessage && (
									<Text align={"center"} color={"brand.200"} fontWeight={600}>
										Request Sent Successfully!
									</Text>
								)}
								{showFailureMessage && (
									<Text align={"center"} color={"red"} fontWeight={400}>
										Could not submit the request, please check all the fields
										and try again!
									</Text>
								)}
							</Box>
						</Stack>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
export default Feedback;
