
import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export { SCREEN_HEIGHT, SCREEN_WIDTH }

const fontScale = PixelRatio.getFontScale()
export const getFontSize = size => size / fontScale

export const Sizes = {
    fixPadding: SCREEN_HEIGHT * 0.02,
    fixHorizontalPadding: SCREEN_WIDTH*0.02
}
export const Colors = {
    primaryTheme: '#EA7515',
    secondryTheme: '#FBBC04',
    secondryLight: '#aad576',
    white: '#fff',
    black: '#000',
    grayA: '#6c757d',
    grayB: '#adb5bd',
    grayC: '#E2DEDE',
    grayD: '#dee2e6',
    grayE: '#e9ecef',
    grayF: '#f8f9fa',
    grayG: '#F7F7F7',
    grayDark: '#4A4A4A',
    redA: '#e76f51',
    wine:'#610F06',
    orange: '#FC4702'
    
}

export const Fonts = {
    // _11PlusJakartaSansRegular: {
    //     fontSize: getFontSize(11),
    //     color: Colors.black,
    //     fontFamily: 'PlusJakartaSans-Regular'
    // },
    // _12PlusJakartaSansRegular: {
    //     fontSize: getFontSize(12),
    //     color: Colors.black,
    //     fontFamily: 'PlusJakartaSans-Regular'
    // },
    // _13PlusJakartaSansRegular: {
    //     fontSize: getFontSize(13),
    //     color: Colors.black,
    //     fontFamily: 'PlusJakartaSans-Regular'
    // },
    // _14PlusJakartaSansRegular: {
    //     fontSize: getFontSize(14),
    //     color: Colors.black,
    //     fontFamily: 'PlusJakartaSans-Regular'
    // },
    // _16PlusJakartaSansRegular: {
    //     fontSize: getFontSize(16),
    //     color: Colors.black,
    //     fontFamily: 'PlusJakartaSans-Regular'
    // },
    // _18PlusJakartaSansRegular: {
    //     fontSize: getFontSize(18),
    //     color: Colors.black,
    //     fontFamily: 'PlusJakartaSans-Regular'
    // },

    // _11PlusJakartaSansMedium: {
    //     fontSize: getFontSize(11),
    //     color: Colors.black,
    //     fontFamily: 'PlusJakartaSans-Medium'
    // },
    // _12PlusJakartaSansMedium: {
    //     fontSize: getFontSize(12),
    //     color: Colors.black,
    //     fontFamily: 'PlusJakartaSans-Medium'
    // },
    // _13PlusJakartaSansMedium: {
    //     fontSize: getFontSize(13),
    //     color: Colors.black,
    //     fontFamily: 'PlusJakartaSans-Medium'
    // },
    // _14PlusJakartaSansMedium: {
    //     fontSize: getFontSize(14),
    //     color: Colors.black,
    //     fontFamily: 'PlusJakartaSans-Medium'
    // },
    // _16PlusJakartaSansMedium: {
    //     fontSize: getFontSize(16),
    //     color: Colors.black,
    //     fontFamily: 'PlusJakartaSans-Medium'
    // },
    // _18PlusJakartaSansMedium: {
    //     fontSize: getFontSize(18),
    //     color: Colors.black,
    //     fontFamily: 'PlusJakartaSans-Medium'
    // },

    // _11PlusJakartaSansBold: {
    //     fontSize: getFontSize(11),
    //     color: Colors.black,
    //     fontFamily: 'PlusJakartaSans-Bold'
    // },
    // _12PlusJakartaSansBold: {
    //     fontSize: getFontSize(12),
    //     color: Colors.black,
    //     fontFamily: 'PlusJakartaSans-Bold'
    // },
    // _13PlusJakartaSansBold: {
    //     fontSize: getFontSize(13),
    //     color: Colors.black,
    //     fontFamily: 'PlusJakartaSans-Bold'
    // },
    // _14PlusJakartaSansBold: {
    //     fontSize: getFontSize(14),
    //     color: Colors.black,
    //     fontFamily: 'PlusJakartaSans-Bold'
    // },
    // _16PlusJakartaSansBold: {
    //     fontSize: getFontSize(16),
    //     color: Colors.black,
    //     fontFamily: 'PlusJakartaSans-Bold'
    // },
    // _18PlusJakartaSansBold: {
    //     fontSize: getFontSize(18),
    //     color: Colors.black,
    //     fontFamily: 'PlusJakartaSans-Bold'
    // },


    _11MontserratLight: {
        fontSize: getFontSize(11),
        color: Colors.black,
        fontFamily: 'Montserrat-Light'
    },
    _12MontserratLight: {
        fontSize: getFontSize(12),
        color: Colors.black,
        fontFamily: 'Montserrat-Light'
    },
    _13MontserratLight: {
        fontSize: getFontSize(13),
        color: Colors.black,
        fontFamily: 'Montserrat-Light'
    },
    _14MontserratLight: {
        fontSize: getFontSize(14),
        color: Colors.black,
        fontFamily: 'Montserrat-Light'
    },
    _16MontserratLight: {
        fontSize: getFontSize(16),
        color: Colors.black,
        fontFamily: 'Montserrat-Light'
    },
    _18MontserratLight: {
        fontSize: getFontSize(18),
        color: Colors.black,
        fontFamily: 'Montserrat-Light'
    },

    _11MontserratRegular: {
        fontSize: getFontSize(11),
        color: Colors.black,
        fontFamily: 'Montserrat-Regular'
    },
    _12MontserratRegular: {
        fontSize: getFontSize(12),
        color: Colors.black,
        fontFamily: 'Montserrat-Regular'
    },
    _13MontserratRegular: {
        fontSize: getFontSize(13),
        color: Colors.black,
        fontFamily: 'Montserrat-Regular'
    },
    _14MontserratRegular: {
        fontSize: getFontSize(14),
        color: Colors.black,
        fontFamily: 'Montserrat-Regular'
    },
    _16MontserratRegular: {
        fontSize: getFontSize(16),
        color: Colors.black,
        fontFamily: 'Montserrat-Regular'
    },
    _18MontserratRegular: {
        fontSize: getFontSize(18),
        color: Colors.black,
        fontFamily: 'Montserrat-Regular'
    },


    _11MontserratMedium: {
        fontSize: getFontSize(11),
        color: Colors.black,
        fontFamily: 'Montserrat-Medium'
    },
    _12MontserratMedium: {
        fontSize: getFontSize(12),
        color: Colors.black,
        fontFamily: 'Montserrat-Medium'
    },
    _13MontserratMedium: {
        fontSize: getFontSize(13),
        color: Colors.black,
        fontFamily: 'Montserrat-Medium'
    },
    _14MontserratMedium: {
        fontSize: getFontSize(14),
        color: Colors.black,
        fontFamily: 'Montserrat-Medium'
    },
    _16MontserratMedium: {
        fontSize: getFontSize(16),
        color: Colors.black,
        fontFamily: 'Montserrat-Medium'
    },
    _18MontserratMedium: {
        fontSize: getFontSize(18),
        color: Colors.black,
        fontFamily: 'Montserrat-Medium'
    },
    _20MontserratMedium: {
        fontSize: getFontSize(20),
        color: Colors.black,
        fontFamily: 'Montserrat-Medium'
    },

    _14MontserratBold: {
        fontSize: getFontSize(14),
        color: Colors.black,
        fontFamily: 'Montserrat-Bold'
    },
    _14MontserratSemiBold: {
        fontSize: getFontSize(14),
        color: Colors.black,
        fontFamily: 'Montserrat-SemiBold'
    },

    // _11RobotoMedium: {
    //     fontSize: getFontSize(11),
    //     color: Colors.black,
    //     fontFamily: 'Roboto-Medium'
    // },
    // _12RobotoMedium: {
    //     fontSize: getFontSize(12),
    //     color: Colors.black,
    //     fontFamily: 'Roboto-Medium'
    // },
    // _13RobotoMedium: {
    //     fontSize: getFontSize(13),
    //     color: Colors.black,
    //     fontFamily: 'Roboto-Medium'
    // },
    // _14RobotoMedium: {
    //     fontSize: getFontSize(14),
    //     color: Colors.black,
    //     fontFamily: 'Roboto-Medium'
    // },
    // _16RobotoMedium: {
    //     fontSize: getFontSize(16),
    //     color: Colors.black,
    //     fontFamily: 'Roboto-Medium'
    // },
    // _18RobotoMedium: {
    //     fontSize: getFontSize(18),
    //     color: Colors.black,
    //     fontFamily: 'Roboto-Medium'
    // },

    // _11RobotoRegular: {
    //     fontSize: getFontSize(11),
    //     color: Colors.black,
    //     fontFamily: 'Roboto-Regular'
    // },
    // _12RobotoRegular: {
    //     fontSize: getFontSize(12),
    //     color: Colors.black,
    //     fontFamily: 'Roboto-Regular'
    // },
    // _13RobotoRegular: {
    //     fontSize: getFontSize(13),
    //     color: Colors.black,
    //     fontFamily: 'Roboto-Regular'
    // },
    // _14RobotoRegular: {
    //     fontSize: getFontSize(14),
    //     color: Colors.black,
    //     fontFamily: 'Roboto-Regular'
    // },
    // _16RobotoRegular: {
    //     fontSize: getFontSize(16),
    //     color: Colors.black,
    //     fontFamily: 'Roboto-Regular'
    // },
    // _18RobotoRegular: {
    //     fontSize: getFontSize(18),
    //     color: Colors.black,
    //     fontFamily: 'Roboto-Regular'
    // },

    // _22ShriKhandRegular: {
    //     fontSize: getFontSize(26),
    //     color: Colors.black,
    //     fontFamily: 'Shrikhand-Regular'
    // }
    _14PoppinsSemiBold: {
        fontSize: getFontSize(14),
        color: Colors.black,
        fontFamily: 'Poppins-Regular'
    },
}