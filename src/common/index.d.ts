import {darkScrollbar} from "@mui/material";

export interface IncomingWebSocketMessage {
    type: string
    data: IncomingDataType
}

export type IncomingDataType =
    CrossBuildMsg
    | ChangeEditMsg
    | DispatchMsg
    | CrossUpdateMsg
    | StateChangeMsg
    | CrossConnectionMsg
    | PhaseMsg

export type OutcomingWebSocketMessage = OutcomingDataType

export type OutcomingDataType = {}

export interface CrossBuildMsg {
    access: Access | undefined;
    cross: Cross | undefined;
    dk: Dk | undefined;
    edit: boolean;
    eth: boolean;
    modeRdk: string;
    phases: number[];
    scon: boolean;
    sfdk: boolean;
    state: State | undefined;
    techMode: string;
    model: Model | undefined;
    svg: string | undefined;
    cameras: boolean;
    deviceElc: number;
    deviceError: DeviceError | undefined;
}

export interface ChangeEditMsg {
    edit: boolean
}

export interface DispatchMsg {
    status: boolean
    command: DispatchCommand
    time: string
}

export interface CrossUpdateMsg {
    idevice: number
    sfdk: boolean
    state: State
    status: Tlsost
}

export interface StateChangeMsg {
    state: State
    user: string
}

export interface CrossConnectionMsg {
    scon: boolean
    eth: boolean
}

export interface PhaseMsg {
    dk: Dk
    idevice: number
    modeRdk: string
    techMode: string
    model: Model
}

export interface ErrorMsg {

}

export interface CloseMsg {

}

export interface DispatchCommand {
    cmd: number
    id: number
    param: number
    user: string
}

export interface Access {
    4: boolean;
}

export interface Region {
    num: string;
    nameRegion: string;
}

export interface Area {
    num: string;
    nameArea: string;
}

export interface Tlsost {
    num: number;
    description: string;
    control: boolean;
}

export interface Points {
    Y: number;
    X: number;
}

export interface Cross {
    ID: number;
    region: Region;
    area: Area;
    subarea: number;
    idevice: number;
    tlsost: Tlsost;
    description: string;
    phases?: any;
    points: Points;
    inputError: boolean;
}

export interface Dk {
    rdk: number;
    fdk: number;
    ddk: number;
    edk: number;
    pdk: boolean;
    eedk: number;
    odk: boolean;
    ldk: number;
    ftudk: number;
    tdk: number;
    ftsdk: number;
    ttcdk: number;
}

export interface Model {
    vpcpdl: number;
    vpcpdr: number;
    vpbsl: number;
    vpbsr: number;
    C12: boolean;
    STP: boolean;
    DKA: boolean;
    DTA: boolean;
}

export interface SetupDK {
    dkn: number;
    tmaxf: number;
    tminf: number;
    tminmax: number;
    dktype: number;
    extn: number;
    tprom: number;
    preset: boolean;
}

export interface St {
    line: number;
    start: number;
    num: number;
    tf: number;
    stop: number;
    plus: boolean;
    trs: boolean;
    dt: number;
}

export interface Dk2 {
    dk: number;
    pk: number;
    desc: string;
    tpu: number;
    razlen: boolean;
    tc: number;
    shift: number;
    twot: boolean;
    sts: St[];
}

export interface SetDK {
    dk: Dk2[];
}

export interface Monthset {
    num: number;
    days: number[];
}

export interface MonthSets {
    monthset: Monthset[];
}

export interface Wset {
    num: number;
    days: number[];
}

export interface WeekSets {
    wsets: Wset[];
}

export interface Line {
    npk: number;
    hour: number;
    min: number;
}

export interface Dayset {
    num: number;
    count: number;
    lines: Line[];
}

export interface DaySets {
    daysets: Dayset[];
}

export interface Start {
    hour: number;
    min: number;
}

export interface End {
    hour: number;
    min: number;
}

export interface Stage {
    line: number;
    start: Start;
    end: End;
    lenTVP: number;
    lenMGR: number;
}

export interface SetCtrl {
    Stage: Stage[];
}

export interface Us {
    name: string;
    type: number;
    tvps: number;
    dk: number;
    fazes: string;
    long: number;
}

export interface SetTimeUse {
    uses: Us[];
    ite: number;
    notwork: number[];
}

export interface Timedev {
    tz: number;
    summer: boolean;
    journal: boolean;
    nogprs: boolean;
}

export interface Lv {
    typst: number;
    period: number;
    ninput: number;
    count: number;
}

export interface Defstatis {
    lvs: Lv[];
}

export interface Pt {
    num: number;
    typst: number;
}

export interface Pointset {
    pts: Pt[];
}

export interface Useinput {
    used: boolean[];
}

export interface Mgr {
    phase: number;
    tlen: number;
    tmgr: number;
}

export interface Arrays {
    type: number;
    SetupDK: SetupDK;
    SetDK: SetDK;
    MonthSets: MonthSets;
    WeekSets: WeekSets;
    DaySets: DaySets;
    SetCtrl: SetCtrl;
    SetTimeUse: SetTimeUse;
    timedev: Timedev;
    defstatis: Defstatis;
    pointset: Pointset;
    useinput: Useinput;
    mgrs: Mgr[];
}

export interface State {
    region: number;
    area: number;
    subarea: number;
    id: number;
    idevice: number;
    dgis: string;
    contype: string;
    numdev: number;
    scale: number;
    name: string;
    phone: string;
    wifi: string;
    status: number;
    Arm: string;
    pk: number;
    ck: number;
    nk: number;
    Model: Model;
    arrays: Arrays;
}

export interface DispatchTableRow {
    id: number
    time: string
    status: string
    user: string
}

export interface PhaseTableRow {
    id: number
    numTU: number | string
    shiftPR: number
    timePR: number
    numTS: number | string
    timeMain: number
    timeTS: number
    timeTU: number
}

export interface Model {
    vpcpdl: number;
    vpcpdr: number;
    vpbsl: number;
    vpbsr: number;
    C12: boolean;
    STP: boolean;
    DKA: boolean;
    DTA: boolean;
}

export interface DeviceError {
    V220DK1: boolean;
    V220DK2: boolean;
    RTC: boolean;
    TVP1: boolean;
    TVP2: boolean;
    FRAM: boolean;
}