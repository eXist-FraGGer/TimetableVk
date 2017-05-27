export default {
    line: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'space-around',
        flex: 1
    },
    selectContainer: {
        position: 'absolute',
         backgroundColor: '#fff',
        borderRadius: 5,
        margin: '1em auto',
        padding: '1em',
        marginTop: 0,
        marginBottom: 0,
        boxShadow: '0 2px 4px rgba(0, 0, 0, .2)'
    },
    selectItem: {
        listStyleType: 'none',
        padding: 5
    },
    hoverItem: {
        backgroundColor: 'rgba(255, 224, 0, 0.50)'
    },
    right: {
        display: 'flex',
        justifyContent: 'flex-end',
        flex: 0.5,
        textAlign: 'right'
    },
    left: {
        display: 'flex',
        flex: 0.5,
        textAlign: 'left'
    },
    collision: {
        backgroundColor: 'red'
    }
};
