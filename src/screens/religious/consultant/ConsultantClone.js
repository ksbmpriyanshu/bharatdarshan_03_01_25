import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyStatusBar from '../../../components/StatusBar'
import Header from '../../../components/Header'
import { Colors, Fonts } from '../../../assests/style'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { TouchableOpacity } from 'react-native'

const ConsultantClone = () => {
  const filterData =
    [
      { title:"All" },
      { title:"Astrologer" },
      { title:"Doctor" },
      { title:"Lawyer" },
      { title:"Engineer" },
      { title:"Social Worker" },
    ]
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, }}>
      <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
      <Header title={'Consultancy'} tintColor={Colors.white} />
      <View style={styles.filterView}>
      <FlatList
        data={filterData}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.filterText}>{item?.title}</Text>
        )}
      />
      </View>
      <ScrollView style={{ padding: 10, }}>
        <View style={styles.consultantMainView}>
          <View>
            <Image source={require('../../../assests/images/newsperson.png')} style={styles.consultantImage} />
            <StarRatingDisplay
              rating={4.5}
              starSize={12}
              starStyle={{ marginHorizontal: 0, }}
              style={{ padding: 0, margin: 0, alignSelf: "center", marginTop: 5, }}
            />
          </View>
          <View>
            <Text style={styles.consultantName}>Rakesh Kumar</Text>
            <Text style={styles.consultantPara}>Vedic, Prashana, face Reading</Text>
            <Text style={styles.consultantPara}>Engligh, Hindi</Text>
            <Text style={styles.consultantPara}>Exp:4 years</Text>
            <View style={{ marginTop: 6, display: "flex", flexDirection: "row", gap: 4, }}>
              <Text style={styles.consultantPrice}>₹30</Text>
              <Text style={styles.consultantPrice2}>₹5/min</Text>
            </View>

          </View>
          <View style={{ display: "flex", flexDirection: "row", gap: 4, position: "absolute", right: 8, bottom: 10, }}>
            <TouchableOpacity style={styles.consultantBtn}>
              <Text style={styles.btnText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.consultantBtn}>
              <Text style={styles.btnText}>Call</Text>
            </TouchableOpacity>
          </View>
          <Text style={{
            ...Fonts._12MontserratMedium,
            fontSize: 10,
            color: "green",
            position: "absolute",
            right: 4,
          }}>
            Online
          </Text>
        </View>
        <View style={styles.consultantMainView}>
          <View>
            <Image source={require('../../../assests/images/newsperson.png')} style={styles.consultantImage} />
            <StarRatingDisplay
              rating={4.5}
              starSize={12}
              starStyle={{ marginHorizontal: 0, }}
              style={{ padding: 0, margin: 0, alignSelf: "center", marginTop: 5, }}
            />
          </View>
          <View>
            <Text style={styles.consultantName}>Sumit Kumar</Text>
            <Text style={styles.consultantPara}>Vedic, Prashana, face Reading</Text>
            <Text style={styles.consultantPara}>Engligh, Hindi</Text>
            <Text style={styles.consultantPara}>Exp:4 years</Text>
            <View style={{ marginTop: 6, display: "flex", flexDirection: "row", gap: 4, }}>
              <Text style={styles.consultantPrice}>₹30</Text>
              <Text style={styles.consultantPrice2}>₹5/min</Text>
            </View>

          </View>
          <View style={{ display: "flex", flexDirection: "row", gap: 4, position: "absolute", right: 8, bottom: 10, }}>
            <TouchableOpacity style={styles.consultantBtn}>
              <Text style={styles.btnText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.consultantBtn}>
              <Text style={styles.btnText}>Call</Text>
            </TouchableOpacity>
          </View>
          <Text style={{
            ...Fonts._12MontserratMedium,
            fontSize: 10,
            color: "green",
            position: "absolute",
            right: 4,
          }}>
            Online
          </Text>
        </View>
        <View style={styles.consultantMainView}>
          <View>
            <Image source={require('../../../assests/images/newsperson.png')} style={styles.consultantImage} />
            <StarRatingDisplay
              rating={4.5}
              starSize={12}
              starStyle={{ marginHorizontal: 0, }}
              style={{ padding: 0, margin: 0, alignSelf: "center", marginTop: 5, }}
            />
          </View>
          <View>
            <Text style={styles.consultantName}>Priyanshu Kushwaha</Text>
            <Text style={styles.consultantPara}>Vedic, Prashana, face Reading</Text>
            <Text style={styles.consultantPara}>Engligh, Hindi</Text>
            <Text style={styles.consultantPara}>Exp:4 years</Text>
            <View style={{ marginTop: 6, display: "flex", flexDirection: "row", gap: 4, }}>
              <Text style={styles.consultantPrice}>₹30</Text>
              <Text style={styles.consultantPrice2}>₹5/min</Text>
            </View>

          </View>
          <View style={{ display: "flex", flexDirection: "row", gap: 4, position: "absolute", right: 8, bottom: 10, }}>
            <TouchableOpacity style={styles.consultantBtn}>
              <Text style={styles.btnText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.consultantBtn}>
              <Text style={styles.btnText}>Call</Text>
            </TouchableOpacity>
          </View>
          <Text style={{
            ...Fonts._12MontserratMedium,
            fontSize: 10,
            color: "brown",
            position: "absolute",
            right: 4,
          }}>
            Busy
          </Text>
        </View>
        <View style={styles.consultantMainView}>
          <View>
            <Image source={require('../../../assests/images/newsperson.png')} style={styles.consultantImage} />
            <StarRatingDisplay
              rating={4.5}
              starSize={12}
              starStyle={{ marginHorizontal: 0, }}
              style={{ padding: 0, margin: 0, alignSelf: "center", marginTop: 5, }}
            />
          </View>
          <View>
            <Text style={styles.consultantName}>Priyanshu Kushwaha</Text>
            <Text style={styles.consultantPara}>Vedic, Prashana, face Reading</Text>
            <Text style={styles.consultantPara}>Engligh, Hindi</Text>
            <Text style={styles.consultantPara}>Exp:4 years</Text>
            <View style={{ marginTop: 6, display: "flex", flexDirection: "row", gap: 4, }}>
              <Text style={styles.consultantPrice}>₹30</Text>
              <Text style={styles.consultantPrice2}>₹5/min</Text>
            </View>

          </View>
          <View style={{ display: "flex", flexDirection: "row", gap: 4, position: "absolute", right: 8, bottom: 10, }}>
            <TouchableOpacity style={styles.consultantBtn}>
              <Text style={styles.btnText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.consultantBtn}>
              <Text style={styles.btnText}>Call</Text>
            </TouchableOpacity>
          </View>
          <Text style={{
            ...Fonts._12MontserratMedium,
            fontSize: 10,
            color: "grey",
            position: "absolute",
            right: 4,
          }}>
            Offline
          </Text>
        </View>
        <View style={styles.consultantMainView}>
          <View>
            <Image source={require('../../../assests/images/newsperson.png')} style={styles.consultantImage} />
            <StarRatingDisplay
              rating={4.5}
              starSize={12}
              starStyle={{ marginHorizontal: 0, }}
              style={{ padding: 0, margin: 0, alignSelf: "center", marginTop: 5, }}
            />
          </View>
          <View>
            <Text style={styles.consultantName}>Priyanshu Kushwaha</Text>
            <Text style={styles.consultantPara}>Vedic, Prashana, face Reading</Text>
            <Text style={styles.consultantPara}>Engligh, Hindi</Text>
            <Text style={styles.consultantPara}>Exp:4 years</Text>
            <View style={{ marginTop: 6, display: "flex", flexDirection: "row", gap: 4, }}>
              <Text style={styles.consultantPrice}>₹30</Text>
              <Text style={styles.consultantPrice2}>₹5/min</Text>
            </View>

          </View>
          <View style={{ display: "flex", flexDirection: "row", gap: 4, position: "absolute", right: 8, bottom: 10, }}>
            <TouchableOpacity style={styles.consultantBtn}>
              <Text style={styles.btnText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.consultantBtn}>
              <Text style={styles.btnText}>Call</Text>
            </TouchableOpacity>
          </View>
          <Text style={{
            ...Fonts._12MontserratMedium,
            fontSize: 10,
            color: "grey",
            position: "absolute",
            right: 4,
          }}>
            Offline
          </Text>
        </View>
        <View style={{paddingVertical:20,}}></View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ConsultantClone

const styles = StyleSheet.create({
  consultantMainView: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    gap: 10,
    paddingBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },

  consultantImage: {
    width: responsiveScreenWidth(21),
    height: responsiveScreenHeight(10),
    borderRadius: 100,
    objectFit: "cover",
  },
  consultantName: {
    ...Fonts._14MontserratMedium,
    marginBottom: 3,
  },
  consultantPara: {
    ...Fonts._12MontserratLight,
    fontSize: 9,
    lineHeight: 14,

  },
  consultantPrice: {
    ...Fonts._12MontserratLight,
    fontSize: 12,
    lineHeight: 14,
    textDecorationLine: "line-through"

  },
  consultantPrice2: {
    ...Fonts._12MontserratLight,
    fontSize: 12,
    lineHeight: 14,
    color: Colors.orange
  },
  consultantBtn: {
    borderWidth: 0.4,
    borderColor: Colors.orange,
    borderRadius: 4,
  },
  btnText: {
    ...Fonts._12MontserratLight,
    fontSize: 12,
    lineHeight: 14,
    color: Colors.orange,
    alignSelf: "center",
    paddingVertical: 4,
    paddingHorizontal: 15,

  },

  filterText:{
    ...Fonts._12MontserratLight,
    borderWidth:0.3,
    borderColor:Colors.orange,
    padding:10,
    marginRight:5,
    paddingVertical:5,
    borderRadius:10,
  },
  filterView:{
    paddingVertical:10,
    paddingHorizontal:10,
    backgroundColor:"#f7f7f7"
  }
})