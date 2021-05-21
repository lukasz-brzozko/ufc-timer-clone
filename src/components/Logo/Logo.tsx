import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ReactComponent as UFCLogo } from '../../assets/ufc-logo.svg';

import styles from './Logo.module.scss';

function Logo(): JSX.Element {
  const refLogo = useRef<SVGSVGElement>(null);
  const refLogokWrapper = useRef<HTMLDivElement>(null);

  const showLogo = useCallback(
    () => {
      const tl = gsap.timeline({
        defaults: {
          duration: '0.3',
          ease: 'power1.inOut',
        },
        id: 'showLogo',
      });

      tl
        .fromTo(refLogo.current, { y: '-100%' }, { y: '0%' });
    },
    [refLogo],
  );

  const hideLogoWrapperBackground = useCallback(
    () => {
      const tl = gsap.timeline({
        defaults: {
          duration: '0.1',
        },
        id: 'hideLogoWrapperBackground',
      });

      tl
        .set(refLogokWrapper.current, {
          backgroundImage: 'none', left: '50%', width: '100%', x: '-50%',
        });
    },
    [refLogokWrapper],
  );

  const showLogoWrapperBackground = useCallback(
    () => {
      const tl = gsap.timeline({
        defaults: {
          duration: '0.4',
        },
        id: 'showLogoWrapperBackground',
      });

      tl
        .set(refLogokWrapper.current, { clearProps: 'backgroundImage' })
        .fromTo(refLogokWrapper.current, { width: '100%' }, { left: '0', width: refLogo.current?.clientWidth, x: '0' }, '+=0.5');
    },
    [refLogokWrapper],
  );

  useEffect(() => {
    showLogo();
    hideLogoWrapperBackground();
    showLogoWrapperBackground();
  }, []);

  return (
    <div className={styles.ufcLogoWrapper} ref={refLogokWrapper}>
      <UFCLogo className={styles.ufcLogo} ref={refLogo} />
    </div>
  );
}

export default Logo;
