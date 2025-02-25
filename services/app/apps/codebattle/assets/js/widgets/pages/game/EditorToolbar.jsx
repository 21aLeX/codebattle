import React from 'react';
import DarkModeButton from './DarkModeButton';
import GameResultIcon from './GameResultIcon';
import LanguagePicker from '../../components/LanguagePicker';
import UserInfo from '../../components/UserInfo';
import VimModeButton from './VimModeButton';
import GameActionButtons from './GameActionButtons';
import GameRoomModes from '../../config/gameModes';
import UserGameScore from './UserGameScore';

const ModeButtons = ({ player }) => (
  <div
    className="btn-group align-items-center mr-auto"
    role="group"
    aria-label="Editor mode"
  >
    <VimModeButton playerId={player.id} />
    <DarkModeButton playerId={player.id} />
  </div>
);

const EditorToolbar = ({
  type,
  mode,
  player,
  editor,
  toolbarClassNames,
  editorSettingClassNames,
  userInfoClassNames,
  langPickerStatus,
  actionBtnsProps,
  showControlBtns,
  isHistory = false,
}) => (
  <>
    <div className="rounded-top" data-player-type={type}>
      <div className={toolbarClassNames} role="toolbar">
        <div className="d-flex justify-content-between">
          <div
            className={editorSettingClassNames}
            role="group"
            aria-label="Editor settings"
          >
            <LanguagePicker editor={editor} status={langPickerStatus} />
          </div>
          {showControlBtns && !isHistory && <ModeButtons player={player} />}
        </div>

        <div className="d-flex justify-content-between">
          {showControlBtns && !isHistory && (
            <GameActionButtons {...actionBtnsProps} />
          )}
          <div
            className={userInfoClassNames}
            role="group"
            aria-label="User info"
          >
            <UserInfo user={player} />
            {mode === GameRoomModes.standard && (
              <UserGameScore userId={player.id} />
            )}
          </div>
        </div>
      </div>
    </div>

    <div
      className="position-absolute"
      style={{
        bottom: '5%',
        right: '5%',
        opacity: '0.5',
        zIndex: '100',
      }}
    >
      <GameResultIcon editor={editor} />
    </div>
  </>
);

export default EditorToolbar;
