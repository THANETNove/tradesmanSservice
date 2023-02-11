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

export const statusUpdate = (state = true, action) => {
    switch (action.type) {
        case 'ADD_STATUSUPDATE': //DELETE_NOTIFICATIONSREPAIRWORKTCE
            return action.payload
        case 'DELETE_STATUSUPDATE':
            return true
        default:
            return state;
    }

}
export const dataJob = (state = null, action) => {
    switch (action.type) {
        case 'ADD_DATAJOB': //ADD_DATAJOB
            return action.payload
        case 'DELETE_DATAJOB':
            return action.payload
        default:
            return state;
    }

}

