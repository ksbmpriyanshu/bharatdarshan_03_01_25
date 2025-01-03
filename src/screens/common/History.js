import React, { useEffect, useState } from 'react'
import { FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Colors, SCREEN_WIDTH, Sizes, Fonts } from '../../assests/style'
import MyStatusBar from '../../components/StatusBar'
import Loader2 from '../../components/Loader2'
import Header from '../../components/Header'
import { connect } from 'react-redux'
import * as CommonActions from '../../redux/actions/CommonActions'
import * as HistoryActions from '../../redux/actions/HistoryActions'
import moment from 'moment'
import Loader from '../../components/Loader'
import { ScreenHeight } from '@rneui/base'

const History = ({ dispatch, rechargeHistoryData }) => {
  console.log("rechargeHistoryData",rechargeHistoryData)
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    dispatch(HistoryActions.getRechargeHistory());
  }, [dispatch])

  const onRefresh = () => {
    dispatch(HistoryActions.getRechargeHistory());
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFBF8' }}>
      <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
      <Loader />
      <Header title={' Order History'} tintColor={Colors.white} />
      <View style={{ flex: 1, paddingHorizontal: Sizes.fixHorizontalPadding, zIndex: -1 }}>
        {rechargeHistoryData && histroydata()}
      </View>
    </SafeAreaView>
  )
  function histroydata() {

    const renderItem = ({ item }) => {
      const paymentstatus = item?.operatorData?.data?.Status;
      console.log(item?.operatorData?.data?.ApiTransID, 'status')

      const paymentstatuscolor = item?.status === 'FAILURE' ? 'red'
        : item?.status === 'SUCCESS' ? '#10BD12'
          : Colors.primaryTheme;


      return (
        <View style={{ margin: Sizes.fixHorizontalPadding, backgroundColor: Colors.white, elevation: 2, flexDirection: 'row', alignItems: 'center', padding: Sizes.fixHorizontalPadding, borderRadius: 10, overflow: 'hidden' }}>
          <View style={{ height: SCREEN_WIDTH * 0.15, width: SCREEN_WIDTH * 0.15, borderWidth: 1, borderRadius: 100, justifyContent: 'center', alignItems: 'center', borderColor: Colors.primaryTheme, backgroundColor: '#E974157', }}>
            <Image source={{ uri: item?.operatorId?.operatorImage }} style={{ height: SCREEN_WIDTH * 0.1, width: SCREEN_WIDTH * 0.1, resizeMode: 'contain' }} />
          </View>
          <View style={{ width: SCREEN_WIDTH * 0.45, marginHorizontal: Sizes.fixHorizontalPadding * 2 }}>
            <Text numberOfLines={2} style={{ ...Fonts._16MontserratRegular, textTransform: 'capitalize' }}>Bill Payment for {item?.billType}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: Sizes.fixHorizontalPadding * 0.6, width: SCREEN_WIDTH * 0.5 }}>
              <Text style={{ ...Fonts._14MontserratRegular, color: '#18487F' }}>₹ {item?.amount}</Text>
              <Text style={{ ...Fonts._14MontserratRegular, width: SCREEN_WIDTH * 0.4, left: Sizes.fixHorizontalPadding, color: paymentstatuscolor }}>
                {item?.status === 'FAILURE' ? 'Payment Failed' : item?.status === 'SUCCESS' ? 'Successfull' : 'Payment Pending'}
              </Text>
            </View>
            <Text numberOfLines={2} style={{ ...Fonts._12MontserratMedium, color: '#4A4949' }}>{item?.operatorData?.data?.ApiTransID}</Text>
          </View>
          <View style={{ width: SCREEN_WIDTH * 0.25 }}>

            <Text style={{ ...Fonts._11MontserratMedium, color: '#837E7E' }}>{moment(item?.createdAt).format('DD/MM/YYYY')}</Text>
            <Text style={{ ...Fonts._11MontserratMedium, color: '#837E7E' }}>{moment(item?.createdAt).format('hh:mm A')}</Text>
          </View>
        </View>
      )
    }
    return (
    
        <View style={{flex:1, }}>
          <FlatList data={rechargeHistoryData} renderItem={renderItem} showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 0.6 }}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No data found</Text>
              </View>
            }
            refreshControl={
              <RefreshControl refreshing={loader} onRefresh={onRefresh} colors={[Colors.primaryTheme]} />
            }
          />

        </View>
      

    )
  }
}


const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    justifyContent: 'center',
    fontSize: 18,
    color: '#666',
  },
});
const mapStateToProps = state => ({
  rechargeHistoryData: state.historyReducer.rechargeHistoryData,

});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(History);
