<template>
    
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText"/>
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Danh bạ
                <i class="fas fa-address-book"></i>
            </h4>
            <ContactList
                v-if="filteredContactsCount > 0"
                :contacts="filteredContacts"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có liên hệ nào</p>

            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>

                <button class="btn btn-sm-success" @click="goToAddContact">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>

                <button class="btn btn-sm btn-danger" @click="removeAllContacts">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeContact">
                <h4>
                    Chi tiết liên hệ
                    <i class="fas fa-address-card "></i>
                </h4>
                <ContactCard :contact="activeContact"/>
                <router-link
                    :to="{
                        name: 'contact.edit',
                        params: { id: activeContact._id},
                    }"
                >
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i>
                        Hiệu chỉnh
                    </span>
                </router-link>
            </div>
        </div>
    </div>

    <!--
        Giải thích:
            + contacts: lưu danh sách các liên hệ để hiển thị. Danh sách này sẽ được lấy về từ server khi
            ContactBook được khởi tạo.
            + activeIndex: chỉ mục của đối tượng contact được chọn bởi người dùng. activeIndex sẽ xác định
            đối tượng contact được đưa vào ContactCard để hiển thị.
            + searchText: chứa dữ liệu nhập vào từ thanh tìm kiếm
    -->
</template>

<script>
    //ContactBook sẽ dựa vào ContactService để cập nhật dữ liệu từ phía server

    import ContactCard from '@/components/ContactCard.vue';
    import InputSearch from '@/components/InputSearch.vue';
    import ContactList from '@/components/ContactList.vue';
    import contactService from '@/services/contact.service';

    export default {
        components: {
            ContactCard,
            InputSearch,
            ContactList,
        },
        data(){
            return{
                contacts: [],        //Danh sách liên để dùng để lấy thông tin từ phía server
                activeIndex: - 1,   //Chỉ mục liên lạc mà người dùng đã chọn và hiển thị trên ContactCard
                searchText: "",     //Tìm kiếm thông tin contact
            };
        },
        watch:{
            //Giám sát các thay đổi của biến searchText. Bỏ phần tử đang chọn trong danh sách
            searchText(){
                this.activeIndex = -1;
            }
        },
        computed:{
            //Chuyển đổi đối tượng contact thành chuỗi để tiện cho tìm kiếm
            contactStrings(){
                return this.contacts.map((contact) => {
                    const {name, mail, address, phone} = contact;
                    return [name, mail, address, phone].join("");
                });
            },
            //Trả về 1 contact chứa thông tin cần tìm
            filteredContacts(){
                if(!this.searchText) return this.contacts;
                return this.contacts.filter((_contact, index) => this.contactStrings[index].includes(this.searchText));
            },
            activeContact(){
                if(this.activeIndex < 0) return null;
                return this.filteredContacts[this.activeIndex];
            },
            filteredContactsCount(){
                return this.filteredContacts.length;
            },
        },
        methods:{
            //Lấy tất cả các thông tin từ danh sách liên hệ
            async retrieveContacts(){
                try{
                    this.contacts = await contactService.getAll();
                }catch(error){
                    console.log(error);
                }
            },
            
            //Làm mới danh sách liên hệ
            refreshList(){
                this.retrieveContacts();
                this.activeIndex = -1;
            },
            
            //Xóa tất cả thông tin trong danh sách liên hệ
            async removeAllContacts(){
                if(confirm("Bạn muốn xóa tất cả Liên hệ?")){
                    try{
                        await contactService.deleteAll();
                        this.refreshList();
                    }catch(error){
                        console.log(error);
                    }
                }
            },

            //Thêm 1 thông tin lên hệ mới
            goToAddContact(){
                this.$router.push({name: "contact.add"});
            },
        },
        mounted(){
            this.refreshList();
        }
    };
    
</script>


<style scoped>
    .page{
        text-align: left;
        max-width: 750px;
    }
</style>
