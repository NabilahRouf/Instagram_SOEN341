// this is a static class used just to show how post layout works as an example, does not dynaamicly add posts. 
const posts = [
    
    {
        profileInitials: 'TD',
        profileName: 'Tarek El Dick',
        date: 'Febuary 4 , 2021',
        imageURL: process.env.PUBLIC_URL + "/assets/trip.jpg",
        caption: 'Im enjoying my summer vacation !',
        comment: 'This is a comment', 

    },
    
    {
        profileInitials: 'MS',
        profileName: 'Muhammad El Sagh',
        date: 'Febuary 2 , 2021',
        imageURL: process.env.PUBLIC_URL + "/assets/studying.jpg",
        caption: 'Im studying hard and ya im black now, reverse micheal jackson',
        comment: 'This is a another comment', 

    },


];

export default posts;