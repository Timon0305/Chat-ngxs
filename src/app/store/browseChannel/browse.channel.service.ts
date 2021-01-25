import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {domain} from "../../fuse-config/rest.api";
import {BrowseChannelModel} from "./browse.channel.model";

@Injectable({
    providedIn: 'root'
})

export class BrowseChannelService {
    token = {'Authorization': 'Bearer ' + localStorage.getItem('token')};
    constructor(
        private http: HttpClient,
    ) {}


    browseChannel(page) {
        return this.http.get<BrowseChannelModel[]>(domain + 'browse.channels?page=' + page,
            {
                headers: this.token
            })
    }
}