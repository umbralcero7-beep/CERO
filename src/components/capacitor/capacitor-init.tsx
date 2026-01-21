'use client';
import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '../providers/language-provider';

export const CapacitorInit = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      // --- Push Notifications Setup ---
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          // Register for push notifications
          PushNotifications.register();
        } else {
          // Show some error
          console.warn('Push notification permission not granted.');
        }
      });

      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration', (token: Token) => {
        console.log('Push registration success, token: ' + token.value);
        // Here you would typically send the token to your backend server
        // to associate it with the current user.
      });

      // Some issue with our setup and push will not work
      PushNotifications.addListener('registrationError', (error: any) => {
        console.error('Error on push notification registration: ' + JSON.stringify(error));
      });

      // Show a toast when a notification is received while the app is running
      PushNotifications.addListener(
        'pushNotificationReceived',
        (notification: PushNotificationSchema) => {
          console.log('Push notification received: ', notification);
          toast({
            title: notification.title || t('habitReminder.toast.title'),
            description: notification.body || '',
          });
        },
      );

      // Method called when tapping on a notification
      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
          console.log('Push notification action performed', notification);
          // Example: navigate to a specific screen
          // const { a, b } = notification.notification.data;
          // if (a === 'habits') {
          //  router.push('/habits');
          // }
        },
      );
    }
  }, [toast, t]);

  return null; // This is a side-effect component and doesn't render anything
};
