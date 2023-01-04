import { useContext } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { playerService } from '../services/playerService';
import { UserContext } from '../../App';
import { Ionicons } from '@expo/vector-icons';

import { theme } from '../theme';
import FullWidthButton from '../components/FullWidthButton';
import { Loading } from '../components/Loading';
import { ProfileDetailComponent } from './ProfileDetailComponent';

export const Profile = ({ setIsAuthenticated }) => {
  const profile = useContext(UserContext);

  const handlePress = async (e) => {
    const res = await playerService.logout();
    setIsAuthenticated(false);
  };
  return profile.name ? (
    <View style={styles.container}>
      <FullWidthButton onPress={handlePress} text={'Logout'} />
      <KeyboardAwareScrollView contentContainerStyle={styles.infoContainer}>
        <Ionicons
          name="person-circle-outline"
          size={120}
          color={theme.onyx}
          style={styles.pic}
        />
        <ProfileDetailComponent label={'Email:'} value={profile.email} />
        <ProfileDetailComponent label={'Name:'} value={profile.name} />
        <ProfileDetailComponent
          label={'Position:'}
          value={profile.position}
          selectList={true}
        />
        <ProfileDetailComponent
          label={'Foot:'}
          value={profile.foot}
          selectList={true}
        />
        <ProfileDetailComponent
          label={'Side:'}
          value={profile.side}
          selectList={true}
        />
        <ProfileDetailComponent
          label={'Nationality:'}
          value={profile.nationality}
        />
        <ProfileDetailComponent label={'Team:'} value={profile.team} />
      </KeyboardAwareScrollView>
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.blackish,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Loading />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.blackish,
  },
  pic: {
    paddingTop: 20,
    alignSelf: 'center',
  },
  infoContainer: {
    marginTop: 10,
    width: '100%',
  },
});
