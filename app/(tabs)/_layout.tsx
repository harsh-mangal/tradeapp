import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>

      <Tabs.Screen 
        name="settings"  
        options={{
          title: 'Stocks',
        
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="money" color={color} />,
        }}
      />
    
         <Tabs.Screen 
        name="Dashboard"  
        options={{
          title: 'Index',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="rupee" color={color} />,
        }}
        
      />
        <Tabs.Screen 
        name="news"  
        options={{
          title: 'News',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="newspaper-o" color={color} />,
        }}
        
      />
    </Tabs>
  );
}
