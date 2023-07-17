access(all) contract MentorMentee {

   pub struct Person {
        pub var menteeName: String
        pub var mentorName: String
        pub var price: Int
        pub var service: String
        pub var currentTimestamp: String
        pub var meetingSchedule: String
        pub var meetingStatus: String

        init(_menteeName: String, _mentorName: String, _price: Int, _service: String, _currentTimestamp: String, _meetingSchedule: String, _meetingStatus: String){
            self.menteeName = _menteeName
            self.mentorName = _mentorName
            self.price = _price
            self.service = _service
            self.currentTimestamp = _currentTimestamp
            self.meetingSchedule = _meetingSchedule
            self.meetingStatus = _meetingStatus
        }

        pub fun changeStatus(meetingStatus: String){
            self.meetingStatus = meetingStatus
        }

        pub fun changeMeetSchedule(meetingSchedule: String){
            self.meetingSchedule = meetingSchedule
        }
    }

    access(all) var meetingCount: Int
    access(all) var greeting: String
    access(all) var mentorMentee: {Int: Person}
    access(all) var ratingRecord: {String: Int}

    // The init() function is required if the contract contains any fields.
    init() {
      self.greeting = "Hello from account!"
      self.meetingCount = 0
      self.mentorMentee = {}
      self.ratingRecord = {}
    }

    // Public function that returns our friendly greeting!
    access(all) fun hello(): String {
      return self.greeting
    }

    access(all) fun setHello() {
      self.greeting = "New Hello!"
    }

    access(all) fun setMeeting(menteeName: String, mentorName: String, price: Int, service: String, currentTimestamp: String, meetingSchedule: String, meetingStatus: String) {
        let person = Person(_menteeName: menteeName, _mentorName: mentorName, _price: price, _service: service, _currentTimestamp: currentTimestamp, _meetingSchedule: meetingSchedule, _meetingStatus: meetingStatus)
        self.mentorMentee[self.meetingCount] = person
        self.meetingCount = self.meetingCount + 1
    }

    access(all) fun getMeetingDetail(id: Int): Person? {
        return self.mentorMentee[id]
    }
 
    access(all) fun getRating(name: String): Int? {
        return self.ratingRecord[name]
    }
 
    access(all) fun confirmMeeting(id: Int, name: String){
        pre {
            self.mentorMentee[id]!.mentorName == name: "Wrong Mentor" 
        }
        self.mentorMentee[id]!.changeStatus(meetingStatus: "Planned") 
    }

    access(all) fun reschedule(id: Int, name: String, timeStampe: String){
        pre {
            self.mentorMentee[id]!.mentorName == name: "Wrong Mentor" 
        }
        self.mentorMentee[id]!.changeMeetSchedule(meetingSchedule: timeStampe) 
    }

    access(all) fun giveFeedback(id: Int, name: String, rating: Int){
        pre {
            self.mentorMentee[id]!.menteeName == name: "Wrong Mentee" 
            self.mentorMentee[id]!.meetingStatus != "Completed": "Already provided feedback" 
        }        
        self.mentorMentee[id]!.changeStatus(meetingStatus: "Completed") 
        var oldRating = self.ratingRecord[self.mentorMentee[id]!.mentorName]
        self.ratingRecord[self.mentorMentee[id]!.mentorName] = (oldRating??0) + rating
    }

     access(all) fun cancelItByMentee(id: Int, name: String){
        pre {
            self.mentorMentee[id]!.menteeName == name: "Wrong Mentee" 
            self.mentorMentee[id]!.meetingStatus != "Cancelled By Mentee": "Already Cancelled by You!" 
            self.mentorMentee[id]!.meetingStatus != "Cancelled By Mentor": "Already Cancelled by Mentor!" 
            self.mentorMentee[id]!.meetingStatus != "Completed": "Already provided feedback" 
        }
        self.mentorMentee[id]!.changeStatus(meetingStatus: "Cancelled By Mentee")           
    }   

    access(all) fun cancelItByMentor(id: Int, name: String){
        pre {
            self.mentorMentee[id]!.mentorName == name: "Wrong Mentor" 
            self.mentorMentee[id]!.meetingStatus != "Cancelled By Mentee": "Already Cancelled by Mentee!" 
            self.mentorMentee[id]!.meetingStatus != "Cancelled By Mentor": "Already Cancelled by You!" 
            self.mentorMentee[id]!.meetingStatus != "Completed": "Already provided feedback" 
        }
        self.mentorMentee[id]!.changeStatus(meetingStatus: "Cancelled By Mentor")           
    }

}
