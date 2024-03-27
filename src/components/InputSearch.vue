<script>
    export default {
        /*
            - props cho phép component con nhận dữ liệu từ component cha.
                + thuộc tính modelValue:
                    Kiểu dữ liệu: String (chuỗi)
                    Giá trị mặc định: "" (chuỗi rỗng)
        */
        props: {
            modelValue: { type: String, default: "" },
        },

        /*
            - emits cho phép component con gửi sự kiện lên component cha.
            Trong đoạn code này, emits được định nghĩa là một mảng chứa hai sự kiện.
                + "submit": Sự kiện này sẽ được kích hoạt khi thành phần con thông báo lên thành phần cha
                rằng quá trình "submit" đã hoàn thành.
                + "update:modelValue": Sựu kiện này dùng để cập nhật giá trị của modelValue trên thành phần cha.
        */
        emits: ["submit", "update:modelValue"],
        methods:{
            updateModelValue(e){
                //giá trị mới của input element (e.target.value) được gửi lên component cha thông qua sự kiện "update:modelValue".
                this.$emit("update:modelValue", e.target.value);
            },
            submit(){
                //sự kiện "submit" được gửi lên component cha để thông báo.
                this.$emit("submit");
            },
        },
    };
</script>

<template>
    <div class="input-group">
        <!--
                Với việc định nghĩa thuộc tính modelValue, liên kết value của input với modelValue và phát sinh sự
            kiện update:modelValue khi value của input thay đổi cho phép ta sử dụng v-model tạo liên kết hai
            chiều với InputSearch
        -->
        <input type="text" class="form-control" placeholder="Nhập thông tin cần tìm"
        :value="modelValue" @input="updateModelValue" @keyup.enter="submit" />

        <div class="input-group-append">
            <button
                class="btn bnt-outline-sec"
                type="button"
                @click="submit"
            >
                <i class="fas fa-search"></i> Tìm kiếm
            </button>
        </div>
    </div>
</template>