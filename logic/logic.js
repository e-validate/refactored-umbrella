import axios from 'axios';

export function getMatches() {
    axios.get('/api/matches').then(res => {
        return res.data
    })
};

export function getCurrentUser() {
    axios.get('/api/profiles/:id').then(res => {
        return res.data
    })
};

export function getUser() {
    axios.get(`/api/user`).then( res => {
        return res.data
    })
};

export function handleChange(value) {
    this.setState({
        name: value
    });
};

export function flipEdit() {
    let editing = false;
    this.setState({
        editing: true
    });
    return editing
};


export function getEndCard() {
    return 'End Card';
};

export function handleSubmit(info) {
    return info
};

export function getMatches() {
    axios.get('/api/matches').then(res => {
        return res.data
    });
};

export function logout() {
    axios.delete('/api/logout').then(res => {
        return res.data
    });
};

export function register() {
    axios.post('/api/register').then(res => {
        return res.data
    });
};

export function deleteMessage(message) {
    message.splice(1,1)
    return message;
};

export function getName() {
    axios
    .get(`api/matchname/:username`)
    .then(res => res.data)
};

export function sendMessage(message) {
    return message
};

export function onSwipeLeft(id) {
    return `Swiped left on ${id}`
};

export function onSwipeRight(id) {
    return `Swiped right on ${id}`
};

export function deleteFavorite(id) {
    let favorites = [id]
    favorites.splice(0, 1)
    return favorites
};

export function addFavorite(id) {
    let favorites = []
    favorites.push(id)
    return favorites
}; 





