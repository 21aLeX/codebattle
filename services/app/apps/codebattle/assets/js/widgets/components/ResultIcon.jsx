import React from 'react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const ResultIcon = ({ gameId, player1, player2 }) => {
  const tooltipId = `tooltip-${gameId}-${player1.id}`;

  if (player1.result === 'gave_up') {
    return (
      <OverlayTrigger
        overlay={<Tooltip id={tooltipId}>Player gave up</Tooltip>}
        placement="left"
      >
        <span className="align-middle mr-1">
          <i className="far fa-flag" aria-hidden="true" />
        </span>
      </OverlayTrigger>
    );
  }

  if (player1.result === 'won' && player2.result !== 'gave_up') {
    return (
      <OverlayTrigger
        overlay={<Tooltip id={tooltipId}>Player won</Tooltip>}
        placement="left"
      >
        <span className="align-middle mr-1">
          <i className="fa fa-trophy text-warning" aria-hidden="true" />
        </span>
      </OverlayTrigger>
    );
  }

  return (
    <span className="align-middle mr-1">
      <i className="fa x-opacity-0">&nbsp;</i>
    </span>
  );
};

export default ResultIcon;
