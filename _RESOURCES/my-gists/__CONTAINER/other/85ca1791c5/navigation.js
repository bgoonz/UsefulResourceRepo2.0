<template>
  <root>
    <AppNavigation />
  </root>
</template>

<script>
  import Screen1 from '@/screens/Screen1'
  import Screen2 from '@/screens/Screen2'
  import Screen3 from '@/screens/Screen3'
  import HomeScreen from '@/screens/HomeScreen'
  import MeetupDetailScreen from '@/screens/MeetupDetailScreen'

  import LoginScreen from '@/screens/LoginScreen'
  import RegisterScreen from '@/screens/RegisterScreen'
  import { Root } from "native-base";

  import { createStackNavigator } from 'react-navigation-stack'
  import { createDrawerNavigator }  from 'react-navigation-drawer'
  import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
  import { createSwitchNavigator,
           createAppContainer } from 'react-navigation'

  const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Meetup: MeetupDetailScreen,
    ScreenOne: Screen1
  },
  {
    initialRouteName: 'Home'
  }
)

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  }
)

const SomeOtherStack = createStackNavigator(
  {
    Screen2,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
)

const SomeOtherStack1 = createStackNavigator(
  {
    Screen3
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
)

const DrawerNavigator = createDrawerNavigator(
  {
    DrawerStack1: SomeOtherStack,
    DrawerStack2: SomeOtherStack1
  }
)

const TabNavigation = createBottomTabNavigator(
  {
    Meetups: HomeStack,
    Other: DrawerNavigator
  }
)

// An iOS style bottom tab-bar navigator
const BottomTabNavigator = createBottomTabNavigator(
  {
    Meetups: HomeStack,
    Other: SomeOtherStack
  }
);

// An Android style top tab-bar navigator
const MaterialTopTabNavigator = createMaterialTopTabNavigator(
  {
    Meetups: HomeStack,
    Other: SomeOtherStack
  }
);

// The navigators can be used as regular screens in any other navigator
const StackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    ScreenOne: Screen1
  },
  {
    initialRouteName: 'Home'
  }
);

const AppNavigation = createAppContainer(createSwitchNavigator({
  auth: AuthStack,
  tabs: TabNavigation
}));

//  const AppNavigation = createAppContainer(TabNavigation)

  export default {
    components: {
      AppNavigation,
      Root
    }
  }
</script>
