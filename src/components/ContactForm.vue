<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";

    export default {
        components:{
            Form,
            Field,
            ErrorMessage,
        },
        props:{
            contact: {type: Object, required: true}
        },
        emits: ['submit:contact', 'delete:contact'],
        data(){
            //Đặt ràng buộc
            const contactFormSchema = yup.object().shape({
                name: yup
                    .string()
                    .required("Vui lòng điền tên.")
                    .min(2,"Tên ít nhất 2 ký tự")
                    .max(50,"Tên không quá 50 ký tự"),
                email: yup
                    .string()
                    .required("Vui lòng điền gmail")
                    .max(50,"Email tối đa 50 ký tự"),
                address: yup
                    .string()
                    .max(100,"Địa chỉ tối đa 50 ký tự"),
                phone: yup
                    .string()
                    .matches( /((09|03|07|08|05)+([0-9]{8})\b)/g ,"Số điện thoại không hợp lệ"),
            });
            return{
                //Vì không muốn hiệu chỉnh props, nên tạo ra biến cục bộ contactLocal để liên kết với các input trên form.
                contactLocal: this.contact,
                contactFormSchema,
            };
        },
        methods:{
            submitContact(){
                this.$emit("submit:contact", this.contactLocal);
            },
            deleteContact(){
                this.$emit("delete:contact", this.contactLocal.id)
            },
        },
    };
    /*
        Trong phương thức data() ở trên, chúng ta định nghĩa lược đồ thể hiện các luật ràng buộc cho các
    trường dữ liệu và đưa các luật này vào form ( :validation-schema="contactFormSchema" ). Cũng
    chú ý rằng ContactForm trên đây có thể phát sinh ra hai sự kiện: submit:contact và delete:contact.
    */
</script>


<template>
    <Form 
        @submit="submitContact"
        :validation-schema="contactFormSchema"
    >
    <!--Tên-->
        <div class="form-group">
            <label for="name">Tên</label>
            <Field
                name="name"
                type="text "
                class="form-control"
                v-model="contactLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback"/>
        </div>

    <!--Email-->
        <div class="form-group">
            <label for="email">Email</label>
            <Field
                name="email"
                type="email"
                class="form-control"
                v-model="contactLocal.email"
            />
            <ErrorMessage name="email" class="error-feedback" />
        </div>

    <!--Address-->
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field
                name="address"
                type="text"
                class="form-control"
                v-model="contactLocal.address"
            />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
    
    <!--Phone-->
        <div class="form-group">
            <label for="phone">Số điện thoại</label>
            <Field
                name="phone"
                type="tel"
                class="form-control"
                v-model="contactLocal.phone"
            />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>

    <!--Favorite-->
        <div class="form-group">
            <input 
                type="checkbox"
                name="favorite"
                class="form-check-input"
                v-model="contactLocal.favorite"
            />
            <label for="favorite" class="form-check-label">
               <strong>Liên hệ yêu thích</strong> 
            </label>
        </div>
        
        <!--Lưu hoặc xóa-->
        <div class="form-group">
            <button class="btn btn-primary">
                Lưu
            </button>
            <button v-if="contactLocal._id" type="button" 
                class="ml-2 btn btn-danger" @click="deleteContact"
            >
                Xóa
            </button>
        </div>
    </Form>
</template>

<style scoped>
    @import "@/assets/form.css";
</style>