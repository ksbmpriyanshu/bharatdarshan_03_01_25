import { View, Text, FlatList, PermissionsAndroid, Platform, StyleSheet, SafeAreaView, TextInput, KeyboardAvoidingView, TouchableOpacity, Image, Alert, Linking, ActivityIndicator } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { Colors, Sizes, Fonts, SCREEN_WIDTH } from '../../assests/style';
import MyStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import Contacts from 'react-native-contacts';
import { connect } from 'react-redux';
import { api_urls } from '../../utils/api-urls';
import { navigate } from '../../navigations/NavigationServices';
import * as RechargeActions from '../../redux/actions/RechargeActions'
import Loader from '../../components/Loader';
import { useNavigation } from '@react-navigation/native';
import Loader2 from '../../components/Loader2';

const Contactlist = ({ navigation, customerdata, dispatch, rechargeData, route, deviceContacts }) => {
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredContacts, setFilteredContacts] = useState([]);

    useEffect(() => {
        async function requestContactPermission() {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                    {
                        title: 'Contacts Permission',
                        message: 'This app needs access to your contacts',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setPermissionGranted(true);
                    console.log('hii')
                    // loadContacts();
                    dispatch(RechargeActions.getDeviceContacts())
                } else {
                    console.log('Contacts permission denied');
                    navigation.goBack();
                    Alert.alert(
                        'Alert',
                        'Go to settings and allow contact permission',
                        [
                            {
                                text: 'Open Settings',
                                onPress: () => Linking.openSettings(),
                            },
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                        ]
                    );
                }
            } else {
                // loadContacts();
                dispatch(RechargeActions.getDeviceContacts())
            }
        }
        requestContactPermission();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const mobile = query.replace(/\s+/g, '').replace('+91', '');
    
        const filtered = deviceContacts.filter(contact =>
            contact.name.toLowerCase().startsWith(query.toLowerCase())
        );
    
        setFilteredContacts(filtered);
    
        // If you want to search mobile plans as well when a valid number is entered
        if (mobile.length === 10 && /^\d+$/.test(mobile)) {
            const payload = {
                phoneNumber: mobile,
                contactdata: {}
            };
            dispatch(RechargeActions.getMobilePlans(payload));
        }
    };
    

    useEffect(() => {
        if (searchQuery.length === 10 && /^\d+$/.test(searchQuery)) {
            setSearchQuery('');
        }
    }, [searchQuery]);

    if (!permissionGranted && Platform.OS === 'android') {
        return (
            <View style={styles.container}>
                <Text>Please allow Contact Permission ....</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryTheme} barStyle={'light-content'} />
            <Loader />
            <Header title={'Contact List'} tintColor={Colors.white} />
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
                {SearchBar()}
                {mynumber()}
                {mynumberdetails()}
                {allnumber()}
                {deviceContacts && allContactList()}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );

    function allContactList() {
        const renderItem = ({ item, index }) => {
            const handledata = (item) => {
                const mobile = item?.phoneNumber.replace(/\s+/g, '').replace('+91', '');
                const payload = {
                    phoneNumber: mobile,
                    contactdata: item
                }
                dispatch(RechargeActions.getMobilePlans(payload));
            }

            return (
                <TouchableOpacity style={styles.contactContainer}
                    onPress={() => handledata(item)}
                    activeOpacity={0.5}
                >
                    <View style={styles.contactInfo}>
                        {item.image ? (
                            <Image source={{ uri: item.image }} style={styles.contactImage} />
                        ) : (
                            <View style={styles.contactImagePlaceholder}>
                                <Text style={styles.contactImagePlaceholderText}>{item.name[0]}</Text>
                            </View>
                        )}
                        <View>
                            <Text style={styles.contactName}>{item?.name}</Text>
                            <Text style={styles.contactPhone}>
                                {item?.phoneNumber}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.rechargeButton}

                        onPress={() => handledata(item)}
                    >
                        <Text style={styles.rechargeText}>Recharge</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            )
        }
        return (
            <View style={styles.container}>
                <FlatList
    data={filteredContacts.length > 0 ? filteredContacts : deviceContacts}
    initialNumToRender={10}
    maxToRenderPerBatch={10}
    renderItem={renderItem}
    showsVerticalScrollIndicator={false}
    ListEmptyComponent={() => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', marginTop: Sizes.fixPadding }}>No Contacts Found</Text>
            <ActivityIndicator size="large" color={Colors.primaryTheme} />
        </View>
    )}
/>
            </View>
        )
    }

    function allnumber() {
        return (
            <View style={{ backgroundColor: '#F6F4F4', paddingHorizontal: Sizes.fixHorizontalPadding * 2, paddingVertical: Sizes.fixPadding * 0.6, marginTop: Sizes.fixPadding * 0.6 }}>
                <Text style={{ ...Fonts._14MontserratRegular }}>Select a Number</Text>
            </View>
        )
    }
    function mynumberdetails() {
        const handledata = () => {
            const mobile = customerdata?.phone?.replace(/\s+/g, '').replace('+91', '');
            const payload = {
                data: {
                    mob: mobile,
                    name: customerdata?.name

                },
            }
            dispatch(RechargeActions.getrecharge(payload));

        }

        return (
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Sizes.fixHorizontalPadding * 2 }}
                onPress={() => handledata()}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: customerdata?.image }} style={{ height: SCREEN_WIDTH * 0.15, width: SCREEN_WIDTH * 0.15, resizeMode: 'cover', borderRadius: 100 }} />
                    <View style={{ marginLeft: Sizes.fixHorizontalPadding * 2 }}>
                        <Text style={{ ...Fonts._14MontserratRegular }}>{customerdata?.name?.slice(0, 15)}</Text>
                        <Text style={{ ...Fonts._14MontserratRegular }}>{customerdata?.phone}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ width: '30%', justifyContent: 'center', alignItems: 'center', paddingVertical: Sizes.fixPadding * 0.3, borderRadius: 100, backgroundColor: Colors?.primaryTheme }}
                //    onPress={() => handledata()}
                >
                    <Text style={{ ...Fonts._14MontserratRegular, color: Colors.white }}>Recharge</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
    function mynumber() {
        return (
            <View style={{ backgroundColor: '#F6F4F4', marginVertical: Sizes.fixPadding, paddingHorizontal: Sizes.fixHorizontalPadding * 2, paddingVertical: Sizes.fixPadding * 0.6 }}>
                <Text style={{ ...Fonts._14MontserratRegular }}>My Number</Text>
            </View>
        )
    }

    function SearchBar() {
        return (
            <View style={styles.searchContainer}>
                <TextInput
    style={styles.searchInput}
    cursorColor={Colors.black}
    placeholder='Enter Name or Mobile Number'
    value={searchQuery}
    onChangeText={handleSearch}
    placeholderTextColor={Colors.grayA}
/>

            </View>
        )
    }
};

const mapStateToProps = state => ({
    customerdata: state.registrationReducer.customerdata,
    rechargeData: state.rechargeReducer.rechargeData,
    deviceContacts: state.rechargeReducer.deviceContacts
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Contactlist);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingVertical: Sizes.fixPadding * 0.9,
        paddingHorizontal: Sizes.fixHorizontalPadding * 2
    },
    contactContainer: {
        marginBottom: Sizes.fixPadding,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: Sizes.fixPadding,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Sizes.fixPadding * 0.6
    },
    contactName: {
        ...Fonts._14MontserratRegular,
        width:120,
    },
    contactPhone: {
        ...Fonts._13MontserratMedium,
        color: '#00000070'
    },
    rechargeButton: {
        backgroundColor: Colors.primaryTheme,
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Sizes.fixPadding * 0.3,
        borderRadius: 100,
    },
    rechargeText: {
        ...Fonts._14MontserratRegular,
        color: Colors.white
    },
    searchContainer: {
        paddingHorizontal: Sizes.fixHorizontalPadding * 2,
        paddingTop: Sizes.fixPadding,
        height: SCREEN_WIDTH * 0.17,
    },
    searchInput: {
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: Sizes.fixHorizontalPadding * 2,
        borderColor: '#ccc',
        ...Fonts._14MontserratRegular
    },
    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    contactImage: {
        width: SCREEN_WIDTH * 0.15,
        height: SCREEN_WIDTH * 0.15,
        borderRadius: 100,
        marginRight: Sizes.fixPadding
    },
    contactImagePlaceholder: {
        width: SCREEN_WIDTH * 0.15,
        height: SCREEN_WIDTH * 0.15,
        borderRadius: 100,
        backgroundColor: Colors.primaryTheme,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Sizes.fixPadding
    },
    contactImagePlaceholderText: {
        ...Fonts._18MontserratRegular,
        color: Colors.white
    },
});
