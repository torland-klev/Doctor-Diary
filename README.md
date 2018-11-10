# Case 1: Doctors diary

In a state in India, the Ministry of Health wants to get more insight into the workload and challenges that doctors at public hospitals and clinics face. To do so, they want to implement DHIS2 to support collection, flow, and presentation of this information. However, many of the doctors have limited prior experience with digital artifacts, and due to a hectic workday with many patients, their capacity to learn and operate advanced digital interfaces is limited.

The Ministry thus wants an easy-to-use interface where doctors can do a brief daily report consisting of some predefined elements such as types of patients, use of equipment, and issues experienced with equipment or infrastructure. In addition to data entry, the application should allow the user to get an overview of previous reports and edit these.

Moreover, a district health officer responsible for a variety of health clinics and hospital within a district should be able to list, view, and approve the reports submitted by the doctors in their district. If something is wrong in the report, it should be possible to provide comments and decline it. The interface used by the doctors should indicate which daily reports that have been approved, and which have been declined (with comments) so that they can correct the errors and re-submit it.

Not many hospitals have computers, stable power supply and internet access. However, all doctors have smartphones which they are already familiar with. Mobile 3G or 4G network coverage is good, but connectivity can be slow and unstable throughout the day.

In sum, there are two types of users in this case: 1) doctors that enter a daily diary/report, and 2) district health officers, that can see all reports within his or her district, and approve or comment on them. Doctors should be able to submit a daily report, see previous reports, and edit and resubmit the ones that have been declined. The district health officers should see the reports from all doctors within their district, and approve/decline and comment on them.

## Comments/updates added
You will work with a pre-configured tracker-program on the course.dhis2.org -server. You can find this by opening the "Tracker Capture" app, and selecting the Kambia --> Bramaia in the org-unit selector. All facilities within Bramaia will have the "Anaesthetist - PBR monitoring"-program assigned. You can see it [here](https://course.dhis2.org/dhis/dhis-web-commons/security/login.action#/dashboard?tei=vjVNrMa4zvc&program=r6qGL4AmFV4&ou=eLLMnNjuluX).

The program is configured in the following manner:
* Each doctor is registered in the system as a "Tracked Entity"
* For each tracked entity a new event is added every day. This represents the daily report/diary.
* You can access all of the elements in the program (both tracked entity, events and more) through the API. See the documentation.

We have created some users for testing. Six users represent doctors and are each assigned to their own health facility (all facilities in the Bramaia district). One represents the district health officer at Bramaia district. The users are configured with the appropriate access rights for approval etc. See the table below for username and password.
* District Health Officer / Bramaia - BjarneB - District1-
* Doctor / Barakuya MCHP - AkselJ - District1-
* Doctor / Gbolon MCHP - CasperL - District1-
* Doctor / Kanku Bramaia MCHP - PatrikM - District1-
* Doctor / Konta CHP - MatsW - District1-
* Doctor / Kukuna CHP - YahyaJ - District1-
* Doctor / Shekaia MCHP - EllingS - District1-
