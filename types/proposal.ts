import {
  DriverProposalArchiveWaitingFindManyTypeMobile,
  DriverProposalMobile,
  DriverWaitingArchiveProposalMobile,
} from "@anysoftuz/carting-shared/dist/types/mobile";

export type PatchProposalDriverType = {
  id: number;
  status: string;
};
export type ProposalStatusType = {
  id: number;
  status:
    | "in_proposal_state"
    | "going_to_pickup_location"
    | "pickup_load"
    | "start_delivery"
    | "arrived"
    | "unload";
};

export type ProposalStopType = {
  message: string;
  status: "stopped" | "moving";
};
export interface ProposalState {
  isLoad: {
    active: boolean;
    waiting: boolean;
    archive: boolean;
  };
  proposal: any;
  activeProposals:
    | (DriverProposalMobile & { vehicle_condition: string }[])
    | [];
  waitingProposals: DriverWaitingArchiveProposalMobile[] | [];
  archiveProposals: DriverProposalArchiveWaitingFindManyTypeMobile;
  getProposals: (type: "active" | "waiting" | "archive", take?: number) => void;
  getOneProposal: (id: number) => void;
  updateProposal: (payload: ProposalStatusType) => void;
  updateStopStatus: (payload: ProposalStopType) => void;
  handleRejectProposal: (payload: { id: number; message: string }) => void;
}
