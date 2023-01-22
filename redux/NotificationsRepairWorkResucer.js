export const NotificationsRepairWorkResucer = (state = null, action) => {
    switch (action.type) {
        case 'ADD_NOTIFICATIONSREPAIRWORK':
            return action.payload
        case 'DELETE_NOTIFICATIONSREPAIRWORK':
            return action.payload
        default:
            return state;
    }

}

export const NotificationsRepairWorkResucerTec = (state = null, action) => {
    switch (action.type) {
        case 'ADD_NOTIFICATIONSREPAIRWORKTCE': //DELETE_NOTIFICATIONSREPAIRWORKTCE
            return action.payload
        case 'DELETE_NOTIFICATIONSREPAIRWORKTCE':
            return action.payload
        default:
            return state;
    }

}

