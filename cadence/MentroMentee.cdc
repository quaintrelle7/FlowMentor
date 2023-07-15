contract MentorMentee {

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
    access(all) var myDictionary: {Int: Person}
    access(all) var ratingRecord: {String: Int}

    // The init() function is required if the contract contains any fields.
    init() {
      self.greeting = "Hello from account 3!"
      self.meetingCount = 0
      self.myDictionary = {}
      self.ratingRecord = {}
    }

    // Public function that returns our friendly greeting!
    access(all) fun hello(): String {
      return self.greeting
    }

    access(all) fun setHello() {
      self.greeting = "New Hello!"
    }

    access(all) fun setValue(menteeName: String, mentorName: String, price: Int, service: String, currentTimestamp: String, meetingSchedule: String, meetingStatus: String) {
        let person = Person(_menteeName: menteeName, _mentorName: mentorName, _price: price, _service: service, _currentTimestamp: currentTimestamp, _meetingSchedule: meetingSchedule, _meetingStatus: meetingStatus)
        self.myDictionary[self.meetingCount] = person
        self.meetingCount = self.meetingCount + 1
    }

    access(all) fun getValue(id: Int): Person? {
        return self.myDictionary[id]
    }
 
    access(all) fun getRating(name: String): Int? {
        return self.ratingRecord[name]
    }
 
    access(all) fun confirmMeeting(id: Int, name: String){
        pre {
            self.myDictionary[id]!.mentorName == name: "Wrong Mentor" 
        }
        self.myDictionary[id]!.changeStatus(meetingStatus: "Planned") 
    }

    access(all) fun reschedule(id: Int, name: String, timeStampe: String){
        pre {
            self.myDictionary[id]!.mentorName == name: "Wrong Mentor" 
        }
        self.myDictionary[id]!.changeMeetSchedule(meetingSchedule: timeStampe) 
    }

    access(all) fun giveFeedback(id: Int, name: String, rating: Int){
        pre {
            self.myDictionary[id]!.menteeName == name: "Wrong Mentee" 
            self.myDictionary[id]!.meetingStatus == "Completed": "Already provided feedback" 
        }        
        self.myDictionary[id]!.changeStatus(meetingStatus: "Completed") 
        var oldRating = self.ratingRecord[self.myDictionary[id]!.mentorName]
        self.ratingRecord[self.myDictionary[id]!.mentorName] = (oldRating??0) + rating
    }

     access(all) fun cancelItByMentee(id: Int, name: String){
        pre {
            self.myDictionary[id]!.menteeName == name: "Wrong Mentee" 
        }
        self.myDictionary[id]!.changeStatus(meetingStatus: "Cancelled By Mentee")           
    }   

    access(all) fun cancelItByMentor(id: Int, name: String){
        pre {
            self.myDictionary[id]!.mentorName == name: "Wrong Mentor" 
        }
        self.myDictionary[id]!.changeStatus(meetingStatus: "Cancelled By Mentor")           
    }

}
