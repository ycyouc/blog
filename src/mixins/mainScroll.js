export default function (refVal) {
    return {
        mounted() {
            this.$bus.$on("setMainScroll", this.setMainScroll);
            this.$refs[refVal].addEventListener("scroll", this.scrollMainFun);
        },
        beforeDestroy() {
            this.$bus.$emit("mainScroll");
            this.$bus.$off("setMainScroll", this.setMainScroll);
            this.$refs[refVal].addEventListener("scroll", this.scrollMainFun);
        },
        methods: {
            scrollMainFun() {
                this.$bus.$emit("mainScroll", this.$refs[refVal]);
            },
            setMainScroll(scrollTop) {
                this.$refs[refVal].scrollTop = scrollTop;
            },
        }
    }
}