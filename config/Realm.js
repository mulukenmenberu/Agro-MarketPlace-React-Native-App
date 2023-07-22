
import Realm from 'realm';
const ThemeSchema = {
  name: 'Theme',
  properties: {
    theme_code: 'int',
  },
};

const appCache = {
  name: 'Cache',
  properties: {
    intro_viewed: 'int',
  },
};

const UserData = {
    name: 'User',
    properties: {
      access_token:"string",
       user_id:'int',
        full_name: 'string'
    },
  };

  const NotificationToken = {
    name: 'Token',
    properties: {
      access_token:"string"
    },
  };


const realm = new Realm({ schema: [ThemeSchema, appCache, UserData, NotificationToken] });


export const saveCache = (intro_viewed) => {
  realm.write(() => {
    const cache = realm.objects('Cache');
    realm.delete(cache);
    realm.create('Cache', { intro_viewed });
  });
};

export const reasdCache = () => {
  return realm.objects('Cache');
};




export const saveTheme = (theme_code) => {
  realm.write(() => {
    // const existingData = realm.objects('Theme').filtered('theme_code = $0', theme_code);
    // if (existingData.length > 0) {
    //   realm.delete(existingData);
    // }
    // realm.deleteAll();
    const users = realm.objects('Theme');
    realm.delete(users);


    realm.create('Theme', { theme_code });
  });
};

export const readThemne = () => {
  return realm.objects('Theme');
};

export const CreateUser = (access_token, user_id, full_name) => {
    realm.write(() => {
    //   realm.deleteAll();
    const users = realm.objects('User');
    realm.delete(users);
      realm.create('User', { access_token, user_id, full_name });
    });
  };
  export const destroyUserData = () => {
    realm.write(() => {
    //   realm.deleteAll();
    const users = realm.objects('User');
    realm.delete(users);
      // realm.create('User', { access_token, user_id, full_name });
    });
  };

  export const readUser = () => {
    return realm.objects('User');
  };

  export const SaveGCMToken = (access_token) => {
    realm.write(() => {
    const token = realm.objects('Token');
    realm.delete(token);
      realm.create('Token', { access_token });
    });
  };

  export const readToken = () => {
    return realm.objects('Token');
  };

export const closeRealm = () => {
  realm.close();
};
