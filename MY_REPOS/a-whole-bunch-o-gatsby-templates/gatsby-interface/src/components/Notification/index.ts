import {
  NotificationTone as NotificationToneDefinition,
  NotificationVariant as NotificationVariantDefinition,
} from "./types"
import {
  NotificationProps as NotificationPropsDefinition,
  NotificationContextValue as NotificationContextValueDefinition,
} from "./Notification"

export type NotificationTone = NotificationToneDefinition
export type NotificationVariant = NotificationVariantDefinition

export type NotificationProps = NotificationPropsDefinition
export type NotificationContextValue = NotificationContextValueDefinition

export { default as Notification } from "./Notification"
