import {Injectable, OnInit} from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class TokenService implements OnInit {
    token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI1MGU0OTdkYS1kOTFjLTRiNDEtOWZkZi03MDcyYjcyZGJkMGEiLCJ1c2VySWQiOiJmNGRjZDg4OC04YTQwLTQ3OTYtOWFmYS02YmI1MmViZGM1ZGMiLCJzcGFjZUlkIjoiODZmZjc4NjYtZjg0Ny00NjI4LWI3NWMtNWYxYTc4ODk5YzM1IiwiaWF0IjoxNjExMzE1NjcxLCJleHAiOjE2MTM5MDc2NzEsImF1ZCI6ImF1ZGllbmNlIiwiaXNzIjoiMzY2IE9wbGVpZGluZ3NwbGF0Zm9ybSIsInN1YiI6ImluZm9AMzY2Lm5sIn0.cwRHykbN5BOJeuaqmiidVbeVDIXG2kP3TtKIlX6WPKY';
    token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiJiOWY2Njg4ZC03NDhmLTQ0OWMtOWI3NS1hNzcwYTc2MzVmNjciLCJ1c2VySWQiOiJlZWY3ODBhZS00NTdiLTQ4ZGUtOTUzNi03Nzc1ZDhjMDYyNmEiLCJzcGFjZUlkIjoiNzJlN2M0YmMtMjljZi00M2YzLTk5MTMtNDdkOGRhYmQ1Y2UzIiwiaWF0IjoxNjExMDA3MzUxLCJleHAiOjE2MTM1OTkzNTEsImF1ZCI6ImF1ZGllbmNlIiwiaXNzIjoiMzY2IE9wbGVpZGluZ3NwbGF0Zm9ybSIsInN1YiI6ImluZm9AMzY2Lm5sIn0.zmXbK3rRoriY3IKdtGVVRiEv4OZHJ4OtczzHM_H6BWc';
    fUser: string;
    sUser: string;
    constructor() {}

    ngOnInit(): void {

        console.log('==================',this.fUser)
    }

    changeToken(id) {
        let f_base64Url = this.token1.split('.')[1];
        let f_base64 = f_base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let f_jsonPayload = decodeURIComponent(atob(f_base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        let s_base64Url = this.token2.split('.')[1];
        let s_base64 = s_base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let s_jsonPayload = decodeURIComponent(atob(s_base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        this.fUser = JSON.parse(f_jsonPayload)['userId'];
        this.sUser = JSON.parse(s_jsonPayload)['userId'];

        let userId = id === this.fUser?this.sUser:this.fUser;
        let token = id === this.fUser?this.token2:this.token1;
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);

        return {
            userId: userId,
            token: token
        }
    }
}