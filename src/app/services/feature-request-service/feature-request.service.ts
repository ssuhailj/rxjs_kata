import { Injectable } from '@angular/core';
import { FeatureRequest } from 'src/app/model/feature-request';
import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureRequestService {
  subjectObs$: Subject<FeatureRequest>;
  behaviorSubjectObs$: BehaviorSubject<FeatureRequest>;
  replaySubjectObs$: ReplaySubject<FeatureRequest>;

  constructor() {
    this.subjectObs$ = new Subject<FeatureRequest>();
    this.behaviorSubjectObs$ = new BehaviorSubject<FeatureRequest>(null);
    this.replaySubjectObs$ = new ReplaySubject<FeatureRequest>(3);
  }

  newRequest(feature: FeatureRequest) {
    this.subjectObs$.next(feature);
    this.replaySubjectObs$.next(feature);
  }

  newRequests(features: FeatureRequest[]) {
    features.forEach(feature => {
      this.behaviorSubjectObs$.next(feature);
      this.replaySubjectObs$.next(feature);
    });
  }

  getSubscribableNewRequests(): Observable<FeatureRequest> {
    return this.subjectObs$.asObservable();
  }

  getSubscribableWithLatestItem(): Observable<FeatureRequest> {
    return this.behaviorSubjectObs$.asObservable();
  }

  getSubscribableWithLastThree(): Observable<FeatureRequest> {
    return this.replaySubjectObs$.asObservable();
  }


}
