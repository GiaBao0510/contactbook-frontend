import createApiClient from "./api.service";

/*
     Lớp ContactService: định nghĩa các phương thức tương tác với phía API server.
    Bằng cách gọi các lời gọi HTTP tương ứng
*/
class ContactService{
    constructor(baseURL = "/api/contacts"){
        this.api = createApiClient(baseURL);
    }
    async getAll(){
        return (await this.api.get('/')).data; 
    }
    async create(data){
        return (await this.api.post('/',data)).data;
    }
    async deleteAll(){
        return (await this.api.delete('/')).data;
    }
    async get(id){
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data){
        return (await this.api.put(`${id}`,data)).data;
    }
    async delete(id){
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default ContactService()