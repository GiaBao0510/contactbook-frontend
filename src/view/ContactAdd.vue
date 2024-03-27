<template>
    <div v-if="contact" class="page">
        <h4>Thêm liên lạc mới</h4>
        <ContactForm
            :contact="contact"
            @submit:contact="CreateContact"
            @delete:contact="deleteContact"
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
    import ContactForm from "@/components/ContactForm.vue";
    import contactService from "@/services/contact.service";

    export default {
        components:{
            ContactForm,
        },
        props:{
            id: {type: String, required: true},
        },
        data(){
            return{
                contact:{
                    name:"",
                    phone:"",
                    email:"",
                    address:""
                },
                message:"",
            };
        },
        methods:{
            //Thêm liên hệ mới
            async CreateContact(contact){
                try{
                    await contactService.create(contact);
                    this.message="Thêm liên hệ thành công";
                }catch(err){
                    console.log(err);
                }
            }
        },
        created(){
            this.message="";
        },
    };
</script>
