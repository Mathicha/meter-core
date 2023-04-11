type AbilityData = {
    Level: number;
    Id: number;
    Points: number;
};

type PKTAbilityChangeNotify = {
    abilityDataList: AbilityData[];
};
declare function read$J(buf: Buffer): PKTAbilityChangeNotify;
declare const name$J = "PKTAbilityChangeNotify";
declare const opcode$J = 2055;

type ActiveAbility = {
    Level: number;
    FeatureType: number;
};

type PKTActiveAbilityNotify = {
    ObjectId: bigint;
    activeAbilityList: ActiveAbility[];
};
declare function read$I(buf: Buffer): PKTActiveAbilityNotify;
declare const name$I = "PKTActiveAbilityNotify";
declare const opcode$I = 8789;

type PKTAddonSkillFeatureChangeNotify = {
    addonSkillFeatureList: {
        SkillId: number;
        addonSkillFeatureIdList: number[];
    }[];
    ObjectId: bigint;
    struct_120: Buffer;
};
declare function read$H(buf: Buffer): PKTAddonSkillFeatureChangeNotify;
declare const name$H = "PKTAddonSkillFeatureChangeNotify";
declare const opcode$H = 27714;

type PKTAuthTokenResult = {
    Unk1_m: Buffer;
    PacketResultCode: number;
};
declare function read$G(buf: Buffer): PKTAuthTokenResult;
declare const name$G = "PKTAuthTokenResult";
declare const opcode$G = 51585;

type PKTBlockSkillStateNotify = {
    ParalyzationPoint: number;
    ParalyzationMaxPoint: number;
    Type: number;
    ObjectId: bigint;
};
declare function read$F(buf: Buffer): PKTBlockSkillStateNotify;
declare const name$F = "PKTBlockSkillStateNotify";
declare const opcode$F = 14430;

type PKTCounterAttackNotify = {
    TargetId: bigint;
    SourceId: bigint;
    Type: number;
};
declare function read$E(buf: Buffer): PKTCounterAttackNotify;
declare const name$E = "PKTCounterAttackNotify";
declare const opcode$E = 25211;

type PKTDeathNotify = {
    Unk0: bigint;
    TargetId: bigint;
    Unk2_0?: number;
    Unk3_0?: number;
    SourceId: bigint;
    Unk5: number;
    Unk6_0?: number;
    Unk7: number;
    Unk8: number;
    Unk9: number;
};
declare function read$D(buf: Buffer): PKTDeathNotify;
declare const name$D = "PKTDeathNotify";
declare const opcode$D = 1006;

type PKTInitAbility = {
    abilityDataList: AbilityData[];
    struct_125: Buffer;
};
declare function read$C(buf: Buffer): PKTInitAbility;
declare const name$C = "PKTInitAbility";
declare const opcode$C = 59534;

type LostArkDateTime = Date;

type PKTInitEnv = {
    Unk0: number;
    Unk1: number;
    struct_542: string;
    lostArkDateTime: LostArkDateTime;
    struct_27: {
        struct_542: string;
        struct_529: string;
        versionString: string;
    }[];
    Unk5: bigint;
    Unk6: number;
    PlayerId: bigint;
};
declare function read$B(buf: Buffer): PKTInitEnv;
declare const name$B = "PKTInitEnv";
declare const opcode$B = 5818;

type StatusEffectData = {
    OccurTime: LostArkDateTime;
    EndTick: bigint;
    Unk2: number;
    SourceId: bigint;
    struct_418: Buffer;
    Unk5_0?: bigint;
    Value?: Buffer;
    TotalTime: number;
    StatusEffectId: number;
    EffectInstanceId: number;
    SkillLevel: number;
};

type Struct_673 = {
    Unk0: number;
    Unk1: number;
    Unk2: number;
    Unk3: bigint;
    Unk4: bigint;
    Unk5: number;
    Unk6: bigint;
};

type PKTInitPC = {
    Unk0: number;
    Unk1: number;
    statPair: {
        StatType: number;
        Value: bigint;
    }[];
    Unk3: number;
    struct_215: Buffer;
    Unk5: bigint;
    Unk6: Buffer;
    Unk7: number;
    Unk8: number;
    statusEffectDatas: StatusEffectData[];
    Name: string;
    Unk11: number;
    Unk12: number;
    Unk13: number;
    ClassId: number;
    Unk15: number;
    Unk16: Buffer;
    Unk17: number;
    struct_343: string;
    Unk19: number;
    Unk20: number;
    Unk21: number;
    Unk22: number;
    Unk23: number;
    Unk24: number;
    Unk25: number;
    Unk26: bigint;
    struct_367: Struct_673[];
    Unk28: bigint;
    Unk29: number;
    Unk30: number;
    Unk31: number;
    Unk32: number;
    Level: number;
    Unk34: number;
    Unk35: number;
    Unk36: number;
    Unk37: number;
    Unk38: Buffer;
    PlayerId: bigint;
    Unk40_0?: number;
    GearLevel: number;
    Unk42: number;
    Unk43: number;
    Unk44: number;
    Unk45: number;
    Unk46: number;
    Unk47: number;
    struct_94: Buffer;
    CharacterId: bigint;
    Unk50: bigint;
    Unk51: number;
    Unk52: number;
    Unk53: number;
    Unk54: number;
    Unk55: number;
    struct_318: Buffer;
};
declare function read$A(buf: Buffer): PKTInitPC;
declare const name$A = "PKTInitPC";
declare const opcode$A = 49736;

type Struct_690 = {
    Unk0: number;
    Unk1: number;
    Unk2_0?: number;
    Unk3_0?: Buffer;
    Unk4: number;
};

type PKTInitLocal = {
    statPair: {
        StatType: number;
        Value: bigint;
    }[];
    struct_397: Struct_690[];
    Unk2: number;
    abilityDataList: AbilityData[];
    struct_125: Buffer;
    statusEffectDatas: StatusEffectData[];
    Unk6_0?: number;
    Unk7: number;
    struct_318: Buffer;
    Unk9: number;
    struct_215: Buffer;
    Unk11: bigint;
    Unk12: bigint;
    addonSkillFeatureList: {
        SkillId: number;
        addonSkillFeatureIdList: number[];
    }[];
    struct_120: Buffer;
    Unk15: number;
};
declare function read$z(buf: Buffer): PKTInitLocal;
declare const name$z = "PKTInitLocal";
declare const opcode$z = 7987;

type PKTMigrationExecute = {
    Account_CharacterId1: bigint;
    Account_CharacterId2: bigint;
    ServerAddr: string;
    AuthKey: number;
};
declare function read$y(buf: Buffer): PKTMigrationExecute;
declare const name$y = "PKTMigrationExecute";
declare const opcode$y = 43659;

type Struct_635 = {
    Unk0: number;
    Unk1: number;
    Unk2_0?: number;
    lostArkDateTime: LostArkDateTime;
    Unk4: number;
    struct_423: Buffer;
};

type Struct_670 = {
    struct_87: Buffer;
    Unk1: number;
    Unk2: number;
    Unk3: number;
    struct_296: Struct_635[];
    Unk5: number;
    lostArkString: string;
    Unk7: bigint;
};

type Angle = number;

type Vector3F = {
    x?: number;
    y?: number;
    z?: number;
};

type NpcData = {
    Unk0: number;
    Unk1_0?: number;
    struct_251?: Buffer;
    statPair: {
        StatType: number;
        Value: bigint;
    }[];
    Unk4: number;
    struct_670?: Struct_670;
    Unk6_0?: number;
    Unk7: number;
    Unk8_0?: number;
    Unk9: number;
    Unk10: number;
    Unk11_0?: bigint;
    Unk12_0?: number;
    TransitIndex?: number;
    DirectionYaw: Angle;
    struct_314?: Buffer;
    Unk16_0?: number;
    TypeId: number;
    struct_367: Struct_673[];
    ObjectId: bigint;
    statusEffectDatas: StatusEffectData[];
    Unk21: number;
    Unk22_0?: number;
    Unk23_0?: number;
    Unk24: number;
    SpawnIndex: number;
    Position: Vector3F;
    Unk27_0?: number;
    Unk28_0?: number;
    Unk29_0?: number;
    Unk30_0?: number;
    Unk31_0?: number;
    Unk32_0?: number;
};

type PKTNewNpc = {
    Unk0_0?: string;
    Unk0_1?: string;
    Unk1: number;
    Unk2_0?: number;
    NpcStruct: NpcData;
    Unk4_0?: bigint;
};
declare function read$x(buf: Buffer): PKTNewNpc;
declare const name$x = "PKTNewNpc";
declare const opcode$x = 29519;

type PKTNewNpcSummon = {
    NpcData: NpcData;
    PublishReason: number;
    OwnerId: bigint;
};
declare function read$w(buf: Buffer): PKTNewNpcSummon;
declare const name$w = "PKTNewNpcSummon";
declare const opcode$w = 34300;

type TrackMoveInfo = {
    Unk0: number;
    Unk1_0?: Buffer;
    Unk2: number;
    Unk3: Buffer;
};

type PCStruct = {
    struct_296: Struct_635[];
    statPair: {
        StatType: number;
        Value: bigint;
    }[];
    Unk2: number;
    Name: string;
    Unk4: number;
    Unk5: number;
    Unk6: number;
    GearLevel: number;
    struct_295: Struct_635[];
    Unk9: Buffer;
    Unk5_m: number;
    CharacterId: bigint;
    Unk12: number;
    Unk13: number;
    struct_120: Buffer;
    Unk15: number;
    Unk16: number;
    Unk17: string;
    Unk18: number;
    Unk19_0?: Buffer;
    ClassId: number;
    Level: number;
    Unk22: number;
    struct_367: Struct_673[];
    Unk24: number;
    Unk25: number;
    Unk26: number;
    Unk27: number;
    Unk28: number;
    Unk29: Buffer;
    Unk30: bigint;
    Heading: Angle;
    Unk32: number;
    Unk33: number;
    Unk34: number;
    Unk35: number;
    Unk36: number;
    addonSkillFeatureList: {
        SkillId: number;
        addonSkillFeatureIdList: number[];
    }[];
    Unk38: number;
    statusEffectDatas: StatusEffectData[];
    PlayerId: bigint;
    Unk41: number;
    Unk42: number;
    struct_87: Buffer;
    Unk44: number;
};

type PKTNewPC = {
    Unk3_0_m?: number;
    Unk5_0_m?: Buffer;
    TrackMoveInfo?: TrackMoveInfo;
    PCStruct: PCStruct;
    Unk2_m: number;
    Unk4_0_m?: Buffer;
    Unk0_m: number;
};
declare function read$v(buf: Buffer): PKTNewPC;
declare const name$v = "PKTNewPC";
declare const opcode$v = 34863;

type TripodLevel = {
    first: number;
    second: number;
    third: number;
};

type TripodIndex = {
    first: number;
    second: number;
    third: number;
};

type ProjectileInfo = {
    struct_314?: Buffer;
    Unk1: number;
    SkillLevel: number;
    Unk3: number;
    OwnerId: bigint;
    Unk5: number;
    Unk6: number;
    ProjectileId: bigint;
    SkillEffect: number;
    TargetObjectId: bigint;
    Unk10_0?: number;
    SkillId: number;
    ChainSkillEffect: number;
    Unk13_0?: bigint;
    Unk14: number;
    tripodLevel: TripodLevel;
    Unk16: number;
    Unk17: number;
    Unk18: bigint;
    tripodIndex: TripodIndex;
    Unk20: bigint;
};

type PKTNewProjectile = {
    projectileInfo: ProjectileInfo;
};
declare function read$u(buf: Buffer): PKTNewProjectile;
declare const name$u = "PKTNewProjectile";
declare const opcode$u = 55720;

type PKTParalyzationStateNotify = {
    NoHitCheckTime: number;
    HitCheckTime: number;
    ParalyzationPoint: number;
    ParalyzationMaxPoint: number;
    DecreasePoint: number;
    Enable: boolean;
    ObjectId: bigint;
};
declare function read$t(buf: Buffer): PKTParalyzationStateNotify;
declare const name$t = "PKTParalyzationStateNotify";
declare const opcode$t = 24051;

type PartyMemberData = {
    Auths: number;
    ZoneInstId: bigint;
    Unk2: number;
    Position: Vector3F;
    CharacterLevel: number;
    WorldId: number;
    Unk6: number;
    CharacterId: bigint;
    TransitIndex: number;
    Unk9: number;
    Unk10: number;
    Unk11: number;
    MaxHp: bigint;
    GearLevel: number;
    ZoneId: number;
    Unk15: number;
    ClassId: number;
    CurHp: bigint;
    PartyMemberNumber: number;
    Name: string;
};

type PKTPartyInfo = {
    PartyType: number;
    PartyLootType: number;
    LootGrade: number;
    RaidInstanceId: number;
    PartyInstanceId: number;
    MemberDatas: PartyMemberData[];
};
declare function read$s(buf: Buffer): PKTPartyInfo;
declare const name$s = "PKTPartyInfo";
declare const opcode$s = 10839;

type PKTPartyLeaveResult = {
    PartyInstanceId: number;
    PartyLeaveType: number;
    Name: string;
};
declare function read$r(buf: Buffer): PKTPartyLeaveResult;
declare const name$r = "PKTPartyLeaveResult";
declare const opcode$r = 41810;

type PKTPartyPassiveStatusEffectAddNotify = {
    ObjectId: bigint;
    Unk0_m: number;
    passiveStatusEffectList: number[];
};
declare function read$q(buf: Buffer): PKTPartyPassiveStatusEffectAddNotify;
declare const name$q = "PKTPartyPassiveStatusEffectAddNotify";
declare const opcode$q = 7578;

type PKTPartyPassiveStatusEffectRemoveNotify = {
    ObjectId: bigint;
    passiveStatusEffectList: number[];
};
declare function read$p(buf: Buffer): PKTPartyPassiveStatusEffectRemoveNotify;
declare const name$p = "PKTPartyPassiveStatusEffectRemoveNotify";
declare const opcode$p = 45127;

type PKTPartyStatusEffectAddNotify = {
    Unk0: bigint;
    CharacterId: bigint;
    statusEffectDatas: StatusEffectData[];
    PlayerIdOnRefresh: bigint;
    Unk4: number;
};
declare function read$o(buf: Buffer): PKTPartyStatusEffectAddNotify;
declare const name$o = "PKTPartyStatusEffectAddNotify";
declare const opcode$o = 17518;

type PKTPartyStatusEffectRemoveNotify = {
    statusEffectIds: number[];
    Unk1: bigint;
    Unk2: number;
    CharacterId: bigint;
};
declare function read$n(buf: Buffer): PKTPartyStatusEffectRemoveNotify;
declare const name$n = "PKTPartyStatusEffectRemoveNotify";
declare const opcode$n = 35134;

type PKTPartyStatusEffectResultNotify = {
    CharacterId: bigint;
    PartyInstanceId: number;
    RaidInstanceId: number;
};
declare function read$m(buf: Buffer): PKTPartyStatusEffectResultNotify;
declare const name$m = "PKTPartyStatusEffectResultNotify";
declare const opcode$m = 7534;

type PKTPassiveStatusEffectAddNotify = {
    passiveStatusEffectList: number[];
};
declare function read$l(buf: Buffer): PKTPassiveStatusEffectAddNotify;
declare const name$l = "PKTPassiveStatusEffectAddNotify";
declare const opcode$l = 12065;

type PKTPassiveStatusEffectRemoveNotify = {
    passiveStatusEffectList: number[];
};
declare function read$k(buf: Buffer): PKTPassiveStatusEffectRemoveNotify;
declare const name$k = "PKTPassiveStatusEffectRemoveNotify";
declare const opcode$k = 28134;

type PKTRaidBossKillNotify = {
    Unk0: Buffer;
};
declare function read$j(buf: Buffer): PKTRaidBossKillNotify;
declare const name$j = "PKTRaidBossKillNotify";
declare const opcode$j = 845;

type PKTRaidResult = {
    Unk0: number;
    Unk1: bigint;
    Unk2: bigint;
    Unk3: bigint;
    Unk4: bigint;
    Unk5: number;
    struct_46: {
        struct_489: Buffer;
        Unk0_0_1: number;
        Unk0_0_2: bigint;
        Unk0_0_3: bigint;
    }[];
    Unk7: number;
};
declare function read$i(buf: Buffer): PKTRaidResult;
declare const name$i = "PKTRaidResult";
declare const opcode$i = 34049;

type UnpublishObject = {
    ObjectId: bigint;
    UnpublishReason: number;
};

type PKTRemoveObject = {
    unpublishedObjects: UnpublishObject[];
};
declare function read$h(buf: Buffer): PKTRemoveObject;
declare const name$h = "PKTRemoveObject";
declare const opcode$h = 57048;

type SkillMoveOptionData = {
    MoveTime?: number;
    StandUpTime?: number;
    DownTime?: number;
    FreezeTime?: number;
    MoveHeight?: number;
    FarmostDist?: number;
    flag40?: Buffer;
};

type SkillDamageEvent = {
    MaxHp: bigint;
    Modifier: number;
    DamageAttr?: number;
    TargetId: bigint;
    CurHp: bigint;
    Damage: bigint;
    Unk3_m: number;
    DamageType: number;
};

type SkillDamageAbnormalMoveEvent = {
    SkillMoveOptionData: SkillMoveOptionData;
    skillDamageEvent: SkillDamageEvent;
    Unk4_m: number;
    Position: Vector3F;
    Unk8_m: number;
    Destination: Vector3F;
    Unk3_m: number;
    Unk1_m: number;
    Unk2_m: bigint;
};

type PKTSkillDamageAbnormalMoveNotify = {
    Unk2_m: number;
    Unk1_m: number;
    SkillEffectId: number;
    SkillId: number;
    SourceId: bigint;
    SkillDamageAbnormalMoveEvents: SkillDamageAbnormalMoveEvent[];
};
declare function read$g(buf: Buffer): PKTSkillDamageAbnormalMoveNotify;
declare const name$g = "PKTSkillDamageAbnormalMoveNotify";
declare const opcode$g = 15322;

type PKTSkillDamageNotify = {
    SourceId: bigint;
    SkillId: number;
    SkillLevel: number;
    SkillDamageEvents: SkillDamageEvent[];
    SkillEffectId: number;
};
declare function read$f(buf: Buffer): PKTSkillDamageNotify;
declare const name$f = "PKTSkillDamageNotify";
declare const opcode$f = 30373;

type PKTSkillStageNotify = {
    Stage: number;
    SourceId: bigint;
    SkillId: number;
};
declare function read$e(buf: Buffer): PKTSkillStageNotify;
declare const name$e = "PKTSkillStageNotify";
declare const opcode$e = 23925;

type SkillOptionData = {
    LayerIndex?: number;
    StartStageIndex?: number;
    TransitIndex?: number;
    StageStartTime?: number;
    FarmostDistance?: number;
    TripodIndex?: TripodIndex;
    TripodLevel?: TripodLevel;
};

type PKTSkillStartNotify = {
    AiStateId?: number;
    AimTargetPosition: Vector3F;
    CurDirectionYaw: Angle;
    SkillLevel: number;
    CurPosition: Vector3F;
    NewDirectionYaw: Angle;
    NewPosition: Vector3F;
    PitchRotation?: Angle;
    Unk1_m?: number;
    SourceId: bigint;
    SkillOptionData: SkillOptionData;
    SkillId: number;
};
declare function read$d(buf: Buffer): PKTSkillStartNotify;
declare const name$d = "PKTSkillStartNotify";
declare const opcode$d = 12114;

type PKTStatChangeOriginNotify = {
    Unk0: {
        StatType: number;
        Value: bigint;
    }[];
    Unk1: {
        StatType: number;
        Value: bigint;
    }[];
    Unk2: number;
    ObjectId: bigint;
    Unk4_0?: number;
};
declare function read$c(buf: Buffer): PKTStatChangeOriginNotify;
declare const name$c = "PKTStatChangeOriginNotify";
declare const opcode$c = 3778;

type PKTStatusEffectAddNotify = {
    Unk0_0?: bigint;
    New: boolean;
    ObjectId: bigint;
    Unk3: bigint;
    statusEffectData: StatusEffectData;
};
declare function read$b(buf: Buffer): PKTStatusEffectAddNotify;
declare const name$b = "PKTStatusEffectAddNotify";
declare const opcode$b = 5430;

type PKTStatusEffectRemoveNotify = {
    Reason: number;
    statusEffectIds: number[];
    ObjectId: bigint;
};
declare function read$a(buf: Buffer): PKTStatusEffectRemoveNotify;
declare const name$a = "PKTStatusEffectRemoveNotify";
declare const opcode$a = 17974;

type PKTStatusEffectDurationNotify = {
    EffectInstanceId: number;
    TargetId: bigint;
    ExpirationTick: bigint;
};
declare function read$9(buf: Buffer): PKTStatusEffectDurationNotify;
declare const name$9 = "PKTStatusEffectDurationNotify";
declare const opcode$9 = 17951;

type PKTStatusEffectSyncDataNotify = {
    Value: number;
    ObjectId: bigint;
    EffectInstanceId: number;
    CharacterId: bigint;
};
declare function read$8(buf: Buffer): PKTStatusEffectSyncDataNotify;
declare const name$8 = "PKTStatusEffectSyncDataNotify";
declare const opcode$8 = 30620;

type PKTTriggerBossBattleStatus = {
    Step: number;
    TriggerId: number;
    Unk2_m: boolean;
};
declare function read$7(buf: Buffer): PKTTriggerBossBattleStatus;
declare const name$7 = "PKTTriggerBossBattleStatus";
declare const opcode$7 = 23146;

type PKTTriggerFinishNotify = {
    TriggerId: number;
    Unk0_m: number;
    InvolvedPCs: bigint[];
    PacketResultCode: number;
};
declare function read$6(buf: Buffer): PKTTriggerFinishNotify;
declare const name$6 = "PKTTriggerFinishNotify";
declare const opcode$6 = 17709;

type PKTTriggerStartNotify = {
    TriggerId: number;
    TriggerSignalType: number;
    InvolvedPCs: bigint[];
    SourceId: bigint;
};
declare function read$5(buf: Buffer): PKTTriggerStartNotify;
declare const name$5 = "PKTTriggerStartNotify";
declare const opcode$5 = 43437;

type PKTTroopMemberUpdateMinNotify = {
    CurHp: bigint;
    CharacterId: bigint;
    MaxHp: bigint;
    Position: bigint;
    statusEffectDatas: StatusEffectData[];
    Unk0_m: number;
};
declare function read$4(buf: Buffer): PKTTroopMemberUpdateMinNotify;
declare const name$4 = "PKTTroopMemberUpdateMinNotify";
declare const opcode$4 = 23607;

type PKTIdentityGaugeChangeNotify = {
    PlayerId: bigint;
    IdentityGauge1: number;
    IdentityGauge2: number;
    IdentityGauge3: number;
};
declare function read$3(buf: Buffer): PKTIdentityGaugeChangeNotify;
declare const name$3 = "PKTIdentityGaugeChangeNotify";
declare const opcode$3 = 45217;

type PKTZoneObjectUnpublishNotify = {
    ObjectId: bigint;
};
declare function read$2(buf: Buffer): PKTZoneObjectUnpublishNotify;
declare const name$2 = "PKTZoneObjectUnpublishNotify";
declare const opcode$2 = 44834;

type ZoneStatusEffectData = {
    Target: number;
    StackCount: number;
    InstanceId: bigint;
    Id: number;
};

type PKTZoneStatusEffectAddNotify = {
    zoneStatusEffectDataList: ZoneStatusEffectData[];
};
declare function read$1(buf: Buffer): PKTZoneStatusEffectAddNotify;
declare const name$1 = "PKTZoneStatusEffectAddNotify";
declare const opcode$1 = 14474;

type PKTZoneStatusEffectRemoveNotify = {
    StatusEffectId: number;
};
declare function read(buf: Buffer): PKTZoneStatusEffectRemoveNotify;
declare const name = "PKTZoneStatusEffectRemoveNotify";
declare const opcode = 56137;

export { opcode$C as $, PKTRaidResult as A, PKTRemoveObject as B, PKTSkillDamageAbnormalMoveNotify as C, PKTSkillDamageNotify as D, PKTSkillStageNotify as E, PKTSkillStartNotify as F, PKTStatChangeOriginNotify as G, PKTStatusEffectAddNotify as H, PKTStatusEffectRemoveNotify as I, PKTStatusEffectDurationNotify as J, PKTStatusEffectSyncDataNotify as K, PKTTriggerBossBattleStatus as L, PKTTriggerFinishNotify as M, PKTTriggerStartNotify as N, PKTTroopMemberUpdateMinNotify as O, PKTAbilityChangeNotify as P, PKTIdentityGaugeChangeNotify as Q, PKTZoneObjectUnpublishNotify as R, PKTZoneStatusEffectAddNotify as S, PKTZoneStatusEffectRemoveNotify as T, opcode$J as U, opcode$I as V, opcode$H as W, opcode$G as X, opcode$F as Y, opcode$E as Z, opcode$D as _, PKTActiveAbilityNotify as a, name$k as a$, opcode$B as a0, opcode$A as a1, opcode$z as a2, opcode$y as a3, opcode$x as a4, opcode$w as a5, opcode$v as a6, opcode$u as a7, opcode$t as a8, opcode$s as a9, opcode$1 as aA, opcode as aB, name$J as aC, name$I as aD, name$H as aE, name$G as aF, name$F as aG, name$E as aH, name$D as aI, name$C as aJ, name$B as aK, name$A as aL, name$z as aM, name$y as aN, name$x as aO, name$w as aP, name$v as aQ, name$u as aR, name$t as aS, name$s as aT, name$r as aU, name$q as aV, name$p as aW, name$o as aX, name$n as aY, name$m as aZ, name$l as a_, opcode$r as aa, opcode$q as ab, opcode$p as ac, opcode$o as ad, opcode$n as ae, opcode$m as af, opcode$l as ag, opcode$k as ah, opcode$j as ai, opcode$i as aj, opcode$h as ak, opcode$g as al, opcode$f as am, opcode$e as an, opcode$d as ao, opcode$c as ap, opcode$b as aq, opcode$a as ar, opcode$9 as as, opcode$8 as at, opcode$7 as au, opcode$6 as av, opcode$5 as aw, opcode$4 as ax, opcode$3 as ay, opcode$2 as az, PKTAddonSkillFeatureChangeNotify as b, read$2 as b$, name$j as b0, name$i as b1, name$h as b2, name$g as b3, name$f as b4, name$e as b5, name$d as b6, name$c as b7, name$b as b8, name$a as b9, read$t as bA, read$s as bB, read$r as bC, read$q as bD, read$p as bE, read$o as bF, read$n as bG, read$m as bH, read$l as bI, read$k as bJ, read$j as bK, read$i as bL, read$h as bM, read$g as bN, read$f as bO, read$e as bP, read$d as bQ, read$c as bR, read$b as bS, read$a as bT, read$9 as bU, read$8 as bV, read$7 as bW, read$6 as bX, read$5 as bY, read$4 as bZ, read$3 as b_, name$9 as ba, name$8 as bb, name$7 as bc, name$6 as bd, name$5 as be, name$4 as bf, name$3 as bg, name$2 as bh, name$1 as bi, name as bj, read$J as bk, read$I as bl, read$H as bm, read$G as bn, read$F as bo, read$E as bp, read$D as bq, read$C as br, read$B as bs, read$A as bt, read$z as bu, read$y as bv, read$x as bw, read$w as bx, read$v as by, read$u as bz, PKTAuthTokenResult as c, read$1 as c0, read as c1, PKTBlockSkillStateNotify as d, PKTCounterAttackNotify as e, PKTDeathNotify as f, PKTInitAbility as g, PKTInitEnv as h, PKTInitPC as i, PKTInitLocal as j, PKTMigrationExecute as k, PKTNewNpc as l, PKTNewNpcSummon as m, PKTNewPC as n, PKTNewProjectile as o, PKTParalyzationStateNotify as p, PKTPartyInfo as q, PKTPartyLeaveResult as r, PKTPartyPassiveStatusEffectAddNotify as s, PKTPartyPassiveStatusEffectRemoveNotify as t, PKTPartyStatusEffectAddNotify as u, PKTPartyStatusEffectRemoveNotify as v, PKTPartyStatusEffectResultNotify as w, PKTPassiveStatusEffectAddNotify as x, PKTPassiveStatusEffectRemoveNotify as y, PKTRaidBossKillNotify as z };
