import React, {FormEvent} from "react";
import axios, {AxiosError, AxiosResponse} from "axios";

interface IState {
    [key: string]: string;

    idWebsite: string
    secretKey: string
}

class ConfigForm extends React.Component<{ locale: string }, IState> {
    constructor(props: {
        locale: string
    }) {
        super(props);

        this.state = {
            idWebsite: '',
            secretKey: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: FormEvent) {
        const target = event.target as HTMLInputElement;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    }

    /**
     * on récupère toutes les infos du compte Netreviews, enregistrées dans le document netreviewsinfo (masterdata)
     */
    async getAccountInfo() {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/vnd.vtex.ds.v10+json',
                    'REST-Range': 'resources=0-10'
                }
            }
            const response = await fetch("/api/dataentities/netreviews/search", options);
            const res = response.json();
            // res.then((data) => this.deleteAccountInfo(data));
            return res;
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    /**
     * Permet de supprimer toutes les données du document netreviewsinfo
     * @param data
     */
    deleteAccountInfo(data: Array<any>) {
        data.forEach(function (element) {

            axios({
                method: 'delete',
                url: '/api/dataentities/netreviews/documents/' + element.id + '',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/vnd.vtex.ds.v10+json",
                }
            })
                .then(function (response: AxiosResponse<any>) {
                    return response;
                })
                .catch(function (error: AxiosError<any>) {
                    console.log(error);
                });
        })
    }

    async componentDidMount() {
        console.log('mounted');
        try {
            const checkInfo = await this.getAccountInfo();

            if (Object.keys(checkInfo).length !== 0) {
                const documentId = checkInfo[Object.keys(checkInfo)[0]];
                const options = {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json', Accept: 'application/vnd.vtex.ds.v10+json'}
                };

                try {
                    const response = await fetch('/api/dataentities/netreviews/documents/' + documentId.id + '?_fields=_all',
                        options
                    )
                    const data = await response.json();

                    this.setState({
                        idWebsite: data.idWebsite,
                        secretKey: data.secretKey
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async saveInfo(action: string, id?: string) {
        const url = id ? "/api/dataentities/netreviews/documents/" + id + "" : "/api/dataentities/netreviews/documents/";
        const body = {
            "idWebsite": this.state.idWebsite,
            "secretKey": this.state.secretKey,
            "plateforme": this.props.locale
        }
        const options = {
            method: action,
            headers: {'Content-Type': 'application/json', Accept: 'application/vnd.vtex.ds.v10+json'},
            body: JSON.stringify(body)
        };

        try {
            const response = await fetch(url, options);
            console.log(response);
            return;
        } catch (error) {
            console.log(error);
        }
    }

    async handleSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            const checkInfo = await this.getAccountInfo()
            if (Object.keys(checkInfo).length !== 0) {
                const documentId = checkInfo[Object.keys(checkInfo)[0]];
                console.log('action PUT');
                await this.saveInfo('put', documentId.id);
                return;
            }
            console.log('action POST');
            await this.saveInfo('post');
            return;
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    IdWebsite:
                    <input name="idWebsite" type="text" value={this.state.idWebsite} onChange={this.handleChange}/>
                </label>
                <label>
                    SecretKey:
                    <input name="secretKey" type="text" value={this.state.secretKey} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

export default ConfigForm;
