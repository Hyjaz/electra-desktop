import * as React from 'react'

const styles: any = require('./styles.css')

interface ComponentProps {
  confirmButtonText: string
  isCancellable?: boolean
  isForm?: boolean
  onClose?: () => void
  onConfirm: () => void
  text?: string
  title: string
}

export default class Modal extends React.PureComponent<ComponentProps> {
  private submitForm(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    this.props.onConfirm()
  }

  private renderContent(): JSX.Element {
    return (
      <div className={styles.innerContainer}>
        <div className={styles.title}>{this.props.title}</div>
        {this.props.text !== undefined && <div className={styles.text}>{this.props.text}</div>}
        {this.props.children}
        <div className={styles.buttonsRow}>
          {Boolean(this.props.isCancellable) && (
            <button
              children={'CANCEL'}
              className={styles.buttonCancel}
              onClick={() => this.props.onClose !== undefined ? this.props.onClose() : void 0}
              type={'button'}
            />)
          }
          <button
            children={this.props.confirmButtonText}
            className={Boolean(this.props.isCancellable) ? styles.button : styles.singleButton}
            onClick={() => !this.props.isForm ? this.props.onConfirm() : void 0}
            type={this.props.isForm ? 'submit' : 'button'}
          />
        </div>
      </div>
    )
  }

  public render(): JSX.Element {
    return Boolean(this.props.isForm)
      ? <form children={this.renderContent()} className={styles.container} onSubmit={this.submitForm.bind(this)} />
      : <div children={this.renderContent()} className={styles.container} />
  }
}
