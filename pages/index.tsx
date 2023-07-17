import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { Button, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import HomePage from "@/components/Home/HomePage";

fcl.config({
	//Emulator
	"accessNode.api": "http://localhost:8888",
	"app.detail.title": "Sharayu's Flow Wallet",

	//wallet to interact with emulator
	"discovery.wallet": "http://localhost:8701/fcl/authn",
	"0xMentorMentee": "0xf8d6e0586b0a20c7",
});

export default function Home() {
	const [user, setUser] = useState({ addr: "" });
	const [name, setName] = useState();
	const [menteeName, setMenteeName] = useState();
	const [mentorName, setMentorName] = useState();
	const [price, setPrice] = useState();
	const [service, setService] = useState();
	const [currentTimestamp, setCurrentTimestamp] = useState();
	const [meetingSchedule, setMeetingSchedule] = useState();
	const [meetingStatus, setMeetingStatus] = useState();
	const [id, setId] = useState();
	const [rating, setRating] = useState();

	useEffect(() => {
		fcl.currentUser.subscribe(setUser);
	}, []);

	const handleLogIn = () => {
		fcl.authenticate();
	};

	const handleLogOut = () => {
		fcl.unauthenticate();
	};

	// const handleGetName = async () => {
	//   const response = await fcl.send([
	//     fcl.script`
	//     import Stuff from 0xStuff

	//     pub fun main(): String{
	//       return Stuff.name
	//     }
	//     `
	//   ])

	//   //(response).then(fcl.decode())

	//   const decodedResponse = await fcl.decode(response);

	//   setName(decodedResponse)
	// }

	const handleGetHello = async () => {
		const response = await fcl.send([
			fcl.script`
      import MentorMentee from 0xMentorMentee

      pub fun main(): String{
        return MentorMentee.hello()
      }
      `,
		]);

		//(response).then(fcl.decode())

		const decodedResponse = await fcl.decode(response);

		setName(decodedResponse);
	};

	// const handleChangeName = async () => {
	//   const txId = await fcl.send([
	//     fcl.transaction`
	//     import Stuff from 0xStuff
	//     transaction(newName: String){
	//       prepare(signer: AuthAccount){

	//       }

	//       execute{
	//         Stuff.changeName(newName: newName)
	//       }
	//     }`,
	//     fcl.args([
	//       fcl.arg(newName, t.String)
	//     ]),
	//     fcl.proposer(fcl.authz),
	//     fcl.payer(fcl.authz),
	//     fcl.authorizations([fcl.authz])
	//   ])
	// }

	const setHello = async () => {
		const txId = await fcl.send([
			fcl.transaction`    
      import MentorMentee from 0xMentorMentee
      transaction() {

        prepare(acc: AuthAccount) {}
      
        execute {
          MentorMentee.setHello()
        }
      }
      `,
			fcl.args(),
			fcl.proposer(fcl.authz),
			fcl.payer(fcl.authz),
			fcl.authorizations([fcl.authz]),
		]);
	};

	const setValuesForMeeting = () => {
		setMenteeName("tushar");
		setMentorName("raju");
		setPrice("99245");
		setService("blockchain");
		setCurrentTimestamp("1323124");
		setMeetingSchedule("234565");
		setMeetingStatus("scheduled");
	};

	const RequestMeeting = async () => {
		const txId = await fcl.send([
			fcl.transaction`    
      import MentorMentee from 0xMentorMentee
      transaction(menteeName: String, mentorName: String, price: Int, service: String, currentTimestamp: String, meetingSchedule: String, meetingStatus: String) {

        prepare(acc: AuthAccount) {}
      
        execute {
          MentorMentee.setMeeting(menteeName: menteeName, mentorName: mentorName, price: price, service: service, currentTimestamp: currentTimestamp, meetingSchedule: meetingSchedule, meetingStatus: meetingStatus)
        }
      }
      `,
			fcl.args([
				fcl.arg(menteeName, t.String),
				fcl.arg(mentorName, t.String),
				fcl.arg(price, t.Int),
				fcl.arg(service, t.String),
				fcl.arg(currentTimestamp, t.String),
				fcl.arg(meetingSchedule, t.String),
				fcl.arg(meetingStatus, t.String),
			]),
			fcl.proposer(fcl.authz),
			fcl.payer(fcl.authz),
			fcl.authorizations([fcl.authz]),
		]);
	};
  const setValuesForgetMeetingData = () => {
		setId(1 );
	};

	const getMeetingData = async () => {
		const response = await fcl.send([
			fcl.script`
      import MentorMentee from 0xMentorMentee

      pub fun main(id1: Int): MentorMentee.Person? {
        return MentorMentee.getMeetingDetail(id: id1)
      }      
      `,
			fcl.args([fcl.arg(id, t.Int)]),
		]);

		//(response).then(fcl.decode())

		const decodedResponse = await fcl.decode(response);
		console.log(decodedResponse);
		// setName(decodedResponse);
	};

	const setValuesForPlanMeeting = () => {
		setId(1);
		setMentorName("raju");
	};

	const PlanMeeting = async () => {
		const txId = await fcl.send([
			fcl.transaction`    
      import MentorMentee from 0xMentorMentee
      transaction(id: Int, name: String) {

        prepare(acc: AuthAccount) {}
      
        execute {
          MentorMentee.confirmMeeting(id: id, name: name)
        }
      }
      `,
			fcl.args([fcl.arg(id, t.Int), fcl.arg(mentorName, t.String)]),
			fcl.proposer(fcl.authz),
			fcl.payer(fcl.authz),
			fcl.authorizations([fcl.authz]),
		]);
	};

	const setValuesForRescheduleMeet = () => {
		setId(1);
		setMentorName("raju");
		setMeetingSchedule("23456225");
	};

	const RescheduleMeet = async () => {
		const txId = await fcl.send([
			fcl.transaction`    
      import MentorMentee from 0xMentorMentee
      transaction(id: Int, name: String, timeStampe: String) {

        prepare(acc: AuthAccount) {}
      
        execute {
          MentorMentee.reschedule(id: id, name: name, timeStampe: timeStampe)
        }
      }
      `,
			fcl.args([
				fcl.arg(id, t.Int),
				fcl.arg(mentorName, t.String),
				fcl.arg(meetingSchedule, t.String),
			]),
			fcl.proposer(fcl.authz),
			fcl.payer(fcl.authz),
			fcl.authorizations([fcl.authz]),
		]);
	};

	const setValuesForFeedback = () => {
		setId(1);
		setMenteeName("tushar");
		setRating("5");
	};

	const giveFeedback = async () => {
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
			fcl.args([fcl.arg(id, t.Int), fcl.arg(menteeName, t.String), fcl.arg(rating, t.Int)]),
			fcl.proposer(fcl.authz),
			fcl.payer(fcl.authz),
			fcl.authorizations([fcl.authz]),
		]);
	};

	const setValuesTogetRating = () => {
		setMentorName("raju");
	};

	const getRating = async () => {
		const response = await fcl.send([
			fcl.script`
      import MentorMentee from 0xMentorMentee

      pub fun main(name: String): Int? {
        return MentorMentee.getRating(name: name)
      }     
      `,
			fcl.args([fcl.arg(mentorName, t.String)]),
		]);

		//(response).then(fcl.decode())

		const decodedResponse = await fcl.decode(response);
		console.log(decodedResponse);
	};

	const setValuesForCancelMeetingByMentee = () => {
		setId(2);
		setMenteeName("tushar");
	};

	const CancelMeetingByMentee = async () => {
		const txId = await fcl.send([
			fcl.transaction`    
      import MentorMentee from 0xMentorMentee
      transaction(id: Int, menteeName: String) {

        prepare(acc: AuthAccount) {}
      
        execute {
          MentorMentee.cancelItByMentee(id: id, name: menteeName)
        }
      }
      `,
			fcl.args([fcl.arg(id, t.Int), fcl.arg(menteeName, t.String)]),
			fcl.proposer(fcl.authz),
			fcl.payer(fcl.authz),
			fcl.authorizations([fcl.authz]),
		]);
	};

	const setValuesForCancelMeetingByMentor = () => {
		setId(0);
		setMentorName("raju");
	};

	const CancelMeetingByMentor = async () => {
		const txId = await fcl.send([
			fcl.transaction`    
      import MentorMentee from 0xMentorMentee
      transaction(id: Int, mentorName: String) {

        prepare(acc: AuthAccount) {}
      
        execute {
          MentorMentee.cancelItByMentor(id: id, name: mentorName)
        }
      }
      `,
			fcl.args([fcl.arg(id, t.Int), fcl.arg(mentorName, t.String)]),
			fcl.proposer(fcl.authz),
			fcl.payer(fcl.authz),
			fcl.authorizations([fcl.authz]),
		]);
	};

	return (
		<>
			<Navbar user={user} handleLogIn={handleLogIn} handleLogOut={handleLogOut} />

			<HomePage />
			<div>
				<div>
					<Button onClick={setValuesForMeeting}> setValuesForMeeting</Button>
					<Button onClick={RequestMeeting}> RequestMeeting</Button>
					<br />
          
					<Button onClick={setValuesForgetMeetingData}> setValuesForgetMeetingData</Button>
					<Button onClick={getMeetingData}> getMeetingData</Button>
					<br />
					<br />
					<Button onClick={setValuesForPlanMeeting}> setValuesForPlanMeeting</Button>
					<Button onClick={PlanMeeting}> PlanMeeting</Button>
					<br />
					<br />
					<Button onClick={setValuesForRescheduleMeet}>
						{" "}
						setValuesForRescheduleMeet
					</Button>
					<Button onClick={RescheduleMeet}> RescheduleMeet</Button>
					<br />
					<br />
					<Button onClick={setValuesForFeedback}> setValuesForFeedback</Button>
					<Button onClick={giveFeedback}> giveFeedback</Button>
					<br />
					<br />
					<Button onClick={setValuesTogetRating}> setValuesTogetRating</Button>
					<Button onClick={getRating}> getRating</Button>
					<br />
					<br />
					<Button onClick={setValuesForCancelMeetingByMentee}>
						{" "}
						setValuesForCancelMeetingByMentee
					</Button>
					<Button onClick={CancelMeetingByMentee}> CancelMeetingByMentee</Button>
					<br />
					<br />
					<Button onClick={setValuesForCancelMeetingByMentor}>
						{" "}
						setValuesForCancelMeetingByMentor
					</Button>
					<Button onClick={CancelMeetingByMentor}> CancelMeetingByMentor</Button>
					<br />
					<br />
					{/* complete planmeeting, reschedule meeting,   give feedback, cancelmeeting, and getrating */}

					<Button onClick={handleGetHello}>Get Name</Button>
					<h1>{name}</h1>
					<Button onClick={setHello}>Change Name</Button>
					{/* <Input type="text" onChange={(e) => setNewName(e.target.value)} /> */}
				</div>
			</div>
		</>
	);
}
