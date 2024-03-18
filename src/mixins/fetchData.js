export default function (defaultType = null) {
    return {
        data() {
            return {
                data: defaultType,
                isLoading: true,
            }
        },
        async created() {
            this.data = await this.getData();
            this.isLoading = false;
        },
    }
}