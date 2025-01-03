import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Fonts, SCREEN_WIDTH, Sizes,  } from '../../../../assests/style'
import { api_urls } from '../../../../utils/api-urls'
import { connect } from 'react-redux'
import * as SancharAction from '../../../../redux/actions/SancharAction'
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers'

const PodcastAudio = ({dispatch,audioData}) => {
  const [pressedItem, setPressedItem] = useState(audioData[0]?._id);
    useEffect(() => {
      setPressedItem(audioData[0]?._id)
        dispatch(SancharAction.getAudio())
      }, [dispatch,audioData[0]?._id])

      const click = async (id) => {
        const payloadVideo = {
          data: { audioSubCategoryId: id },
        }
    
        dispatch(SancharAction.getAudioById(payloadVideo));
      }
    
    return (
        <View>
            {horizontalsong()}
        </View>
    )
    function horizontalsong() {
      const renderItems = ({ item }) => {
          const isPressed = pressedItem === item._id;
          console.log(item,"item?.categoryId?.category_name")
          return (
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity style={{ borderWidth: 2, borderRadius: 100, borderColor: isPressed ? Colors.primaryTheme :'#D9D9D990', marginHorizontal: Sizes.fixHorizontalPadding, marginTop: Sizes.fixPadding * 0.7, overflow: 'hidden' }}
                     onPress={() => {
                      setPressedItem(item._id);
                      click(item._id);
                    }}
            
              >
                <Image source={{ uri: api_urls + item?.image }} style={{ height: ScreenHeight * 0.1, width: ScreenWidth * 0.2, resizeMode: 'cover' }} />
              </TouchableOpacity>
              <Text style={{ ...Fonts._12MontserratRegular, marginTop: Sizes.fixPadding * 0.4, width: SCREEN_WIDTH * 0.3, textAlign: 'center' }}>{item?.sub_category_name}</Text>
            </View>
          )
        }
        return (
          <View >
            <FlatList data={audioData} renderItem={renderItems} horizontal={true} showsHorizontalScrollIndicator={false} />
          </View>
        )
      }
}
const mapStateToProps = state => ({
    audioData: state.sancharReducer.audioData,
  });
  
  const mapDispatchToProps = dispatch => ({ dispatch });
  
  export default connect(mapStateToProps, mapDispatchToProps)(PodcastAudio);