import styles from './connection-overlay.module.scss';
import { BaseElement } from '../../utils/base-element';

export class ConnectionOverlay extends BaseElement<'div'> {
  constructor() {
    super({
      tag: 'div',
      classNames: [styles.overlay],
    });
    this.render();
  }

  private render(): void {
    const spinner = new BaseElement({
      tag: 'div',
      classNames: [styles.spinner],
    });
    const paragraph = new BaseElement({
      tag: 'p',
      classNames: [styles.text],
      text: 'Connecting...',
    });

    this.appendChildren(spinner, paragraph);
  }
}