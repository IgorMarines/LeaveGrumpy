import { CommonActions } from '@react-navigation/native';

export const goTo = (navigation, screenName, params) => {
  navigation.dispatch(CommonActions.navigate({ name: screenName, params }));
};