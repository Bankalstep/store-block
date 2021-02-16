import { IOClients } from "@vtex/api/lib";
import Netreviews from "../clients/netreviews";

export class Clients extends IOClients {
    public get netreviews() {
        return this.getOrSet('netreviews', Netreviews)
    }
}
