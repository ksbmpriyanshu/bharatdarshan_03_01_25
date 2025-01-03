import { View, Text, Modal, Animated, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SCREEN_WIDTH } from '../assets/style';
import CustomerLoader from './CustomerLoader';
import { connect } from 'react-redux';
import * as CommonActions from '../redux/actions/CommonActions'
import { Colors } from '../assests/style';

const Loader = ({ isLoading, dispatch }) => {
    console.log('ghgj',isLoading);
    useEffect(() => {
        return () => {
            dispatch(CommonActions.setIsLoading(false))
        }
    }, [dispatch])
    return (
        <Modal
            visible={isLoading}
            transparent
        >

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(28, 28, 28, 0.3)' }}>
                {/* <CustomerLoader /> */}
                <ActivityIndicator size="large" color={Colors.primaryTheme} />
            </View>

        </Modal>
    )
}

const mapStateToProps = state => ({
    isLoading: state.common.isLoading
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Loader)