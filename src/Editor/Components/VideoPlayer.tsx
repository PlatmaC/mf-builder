import ReactPlayer from 'react-player';
import cn from 'classnames';

import { useAppGlobalStore } from '@/_stores/appGlobalStore';

export const VideoPlayer = ({ properties, styles: { boxShadow, visibility }, width, height }) => {
  const isEditorMode = useAppGlobalStore((state) => state.isEditorMode);

  return (
    <div className={cn({ 'pe-none': isEditorMode })} style={{ boxShadow, display: visibility ? 'block' : 'none' }}>
      <ReactPlayer
        muted={isEditorMode || properties.isMuted}
        width={width - (isEditorMode ? 4 : 2)}
        controls={properties.isControled}
        playing={properties.isAutoplayed}
        loop={properties.isLooped}
        url={properties.source}
        height={height}
      />
    </div>
  );
};
