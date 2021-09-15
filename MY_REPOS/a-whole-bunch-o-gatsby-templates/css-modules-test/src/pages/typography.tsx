import * as React from "react"
import * as styles from "./styles.module.css"
import clsx from "clsx"

export default function FeaturesPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={clsx(styles.heading, styles.xxl)}>Heading</h1>
        <h1 className={clsx(styles.heading, styles.xl)}>Heading</h1>
        <h1 className={clsx(styles.heading, styles.lg)}>Heading</h1>
        <h1 className={clsx(styles.heading, styles.md)}>Heading</h1>
        <h1 className={clsx(styles.heading, styles.sm)}>Heading</h1>
        <h1 className={clsx(styles.heading, styles.xs)}>Heading</h1>
        <h1 className={clsx(styles.heading, styles.xxs)}>Heading</h1>
      </div>
    </div>
  )
}
