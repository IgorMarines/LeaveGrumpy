import { Text as CustomText} from "react-native";
import { View } from "react-native";


export const Text = ({children}) => {
    return (
        <View>
            <CustomText style={{color: '#fff', fontWeight: 500}}>{children}</CustomText>
        </View>
    );
};
