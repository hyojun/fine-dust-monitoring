class FavoriteModel {
    key: string
    checked: boolean
    
    constructor(
        key: string,
        checked: boolean) {
        this.key = key;
        this.checked = checked;
    }
}

export default FavoriteModel;
