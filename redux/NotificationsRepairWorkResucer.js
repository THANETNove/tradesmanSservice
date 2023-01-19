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

