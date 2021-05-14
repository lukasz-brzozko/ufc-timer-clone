import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ReactComponent as UFCLogo } from '../../../../assets/ufc-logo.svg';

import styles from './Logo.module.scss';

function Logo(): JSX.Element {
  const refLogo = useRef <SVGSVGElement>(null);

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

  useEffect(() => {
    showLogo();
  }, []);

  return (
    <div className={styles.ufcLogoWrapper}>
      <UFCLogo className={styles.ufcLogo} ref={refLogo} />
    </div>
  );
}

export default Logo;
