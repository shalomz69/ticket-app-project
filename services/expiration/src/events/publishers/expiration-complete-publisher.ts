import { Publisher, Subjects, ExpirationCompleteEvent } from "@szszsztickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
subject: Subjects.ExpirationComplete =Subjects.ExpirationComplete;

}