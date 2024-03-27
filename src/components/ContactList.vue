<script>
    export default {
        props:{
            contacts: {type: Array, default: []},
            activeIndex: { type: Number, default: -1},
        },
        emits: ["update:activeIndex"],
        methods:{
            updateActiveIndex(index){
                this.$emit("update:activeIndex",index);
            }
        }
    };
</script>

<template>
    <ul class="list-group">
        <!--
                Với việc định nghĩa thuộc tính activeIndex và phát sinh sự kiện update:activeIndex khi một phần tử
            trong danh sách được nhấp chọn cho phép ta sử dụng v-model tạo liên kết hai chiều với
            ContactList, ví dụ: <ContactList v-model:activeIndex="..." />
        -->
        <li
            class="list-group-item"
            v-for="(contact,index) in contacts"
            :key="contact._id"
            :class="{active: index === activeIndex}"
            @click="updateActiveIndex(index)"
        >
            {{contact.name}}
        </li>
    </ul>
</template>