<template>
    <div v-if="contact" class="page">
        <h4>Hiệu chỉnh liên hệ</h4>
        <ContactForm
            :contact="contact"
            @submit:contact="updateContact"
            @delete:contact="deleteContact"
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
    import contactService from '@/services/contact.service';
    import ContactForm from '@/components/ContactForm.vue';
    
    export default {
        components:{
            ContactForm,
        },
        props:{
            id: {type: String, required: true},
        },
        data(){
            return{
                contact: null,
                message:"",
            };
        },
        methods:{
            //Lấy thông tin liên hệ dựa trên ID
            async getContact(id){
                try{
                    this.contact = await contactService.get(id);
                }catch(error){
                    console.log(error);
                    //Chuyển sang trang NotFound đồng thời giữ cho URL không đôi
                    this.$router.push({
                        name:"notFound",
                        params:{
                            //sử dụng this.$route.path.split("/").slice(1) để lấy phần path của URL hiện tại, sau đó truyền vào params với key pathMatch.
                            pathMatch: this.$route.path.split("/").slice(1)
                        },
                        /*
                             Sử dụng thuộc tính query và hash của this.$router.push để truyền query string 
                            và hash của URL hiện tại sang trang NotFound.
                        */
                        query: this.$route.query,
                        hash: this.$route.hash,
                    });
                }
            },

            //Cập nhật thông tin liên hệ có sẵn
            async updateContact(data){
                try{
                    await contactService.update(this.contact._id, data);
                    this.message = "Liên hệ được cập nhật thành công";
                }catch(error){
                    console.log(error);
                }
            },

            //Xóa thông tin liên hệ dựa trên ID
            async deleteContact(){
                if(confirm("Bạn muốn xóa Liên hệ này?")){
                    try{
                        await contactService.delete(this.contact._id);
                        this.$router.push({name: "contactbook"});
                    }catch(error){
                        console.log(error);
                    }
                }
            },
        },

        /*
             created trong một component Vue.js. Nó được thực thi ngay sau khi component được tạo 
            và trước khi nó được gắn vào DOM.
        */
        created(){
            this.getContact(this.id);
            this.message="";
        },
    };
</script>