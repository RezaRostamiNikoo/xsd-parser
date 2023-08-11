export const tagsInLevelOne = [
    "xs:element", //1
    "#text", // 1
    "#comment", // 1
    "xs:simpleType", // 1
    "xs:complexType", // 1
    "xs:attribute", // 1
    "xs:attributeGroup", // 1
    "xs:group", // 1
]


export const treestructure = {
    "#text": {},
    "#comment": {},
    "xs:element": {
        "#text": {},
        "xs:complexType": {
            "#text": {},
            "xs:simpleContent": {
                "#text": {},
                "xs:extension": {
                    "#text": {},
                    "xs:attributeGroup": {}
                }
            },
            "xs:complexContent": {
                "#text": {},
                "xs:extension": {
                    "#text": {},
                    "xs:attributeGroup": {}
                }
            }
        }
    },
    "xs:simpleType": {
        "#text": {},
        "xs:list": {},
        "xs:restriction": {
            "#text": {},
            "xs:enumeration": {},
            "xs:simpleType": {
                "#text": {},
                "xs:list": {}
            },
            "xs:minLength": {},
            "xs:maxLength": {}
        }
    },
    "xs:complexType": {
        "#text": {},
        "xs:sequence": {
            "#text": {},
            "xs:element": {
                "#text": {},
                "xs:complexType": {
                    "#text": {},
                    "xs:sequence": {
                        "#text": {},
                        "xs:element": {}
                    }
                }
            }
        },
        "xs:attribute": {},
        "xs:complexContent": {
            "#text": {},
            "xs:extension": {
                "#text": {},
                "xs:choice": {
                    "#text": {},
                    "xs:element": {}
                },
                "xs:attribute": {
                    "#text": {},
                    "xs:simpleType": {
                        "#text": {},
                        "xs:restriction": {
                            "#text": {},
                            "xs:simpleType": {
                                "#text": {},
                                "xs:list": {}
                            },
                            "xs:minLength": {},
                            "xs:maxLength": {}
                        }
                    }
                },
                "xs:sequence": {
                    "#text": {},
                    "xs:element": {
                        "#text": {},
                        "xs:complexType": {
                            "#text": {},
                            "xs:group": {},
                            "xs:sequence": {
                                "#text": {},
                                "xs:element": {}
                            },
                            "xs:attribute": {}
                        }
                    }
                }
            },
            "xs:restriction": {
                "#text": {},
                "xs:sequence": {
                    "#text": {},
                    "xs:element": {}
                }
            }
        },
        "xs:simpleContent": {
            "#text": {},
            "xs:extension": {
                "#text": {},
                "xs:attribute": {}
            }
        },
        "xs:attributeGroup": {}
    },
    "xs:group": {
        "#text": {},
        "xs:choice": {
            "#text": {},
            "xs:element": {}
        }
    },
    "xs:attributeGroup": {
        "#text": {},
        "xs:attribute": {
            "#text": {},
            "xs:simpleType": {
                "#text": {},
                "xs:restriction": {
                    "#text": {},
                    "xs:simpleType": {
                        "#text": {},
                        "xs:list": {}
                    },
                    "xs:minLength": {}
                }
            }
        }
    },
    "xs:attribute": {
        "#text": {},
        "xs:simpleType": {
            "#text": {},
            "xs:restriction": {
                "#text": {},
                "xs:simpleType": {
                    "#text": {},
                    "xs:list": {}
                },
                "xs:minLength": {}
            },
            "xs:list": {}
        }
    }
}


const attribute = {
    "withChild": {
        "name": "cType",
        "use": [
            "optional"
        ]
    },
    "withoutChild": {
        "name": "extraBits",
        "type": [
            "xs:integer",
            "xs:NMTOKENS",
            "xs:ID",
            "xs:IDREF",
            "xs:anyURI",
            "ifc:IfcLabel",
            "ifc:IfcNonNegativeLengthMeasure",
            "ifc:IfcPositiveLengthMeasure",
            "ifc:IfcDate",
            "ifc:IfcWorkScheduleTypeEnum",
            "ifc:IfcWorkPlanTypeEnum",
            "ifc:IfcDateTime",
            "ifc:IfcDuration",
            "ifc:IfcWorkCalendarTypeEnum",
            "ifc:IfcBoolean",
            "ifc:IfcWindowTypePartitioningEnum",
            "ifc:IfcWindowTypeEnum",
            "ifc:IfcWindowStyleOperationEnum",
            "ifc:IfcWindowStyleConstructionEnum",
            "ifc:IfcWindowPanelPositionEnum",
            "ifc:IfcWindowPanelOperationEnum",
            "ifc:IfcLengthMeasure",
            "ifc:IfcNormalisedRatioMeasure",
            "ifc:IfcWasteTerminalTypeEnum",
            "ifc:IfcWallTypeEnum",
            "ifc:IfcVoidingFeatureTypeEnum",
            "ifc:IfcVibrationIsolatorTypeEnum",
            "ifc:IfcValveTypeEnum",
            "ifc:IfcUnitaryEquipmentTypeEnum",
            "ifc:IfcUnitaryControlElementTypeEnum",
            "ifc:IfcPlaneAngleMeasure",
            "ifc:IfcText",
            "ifc:IfcIdentifier",
            "ifc:IfcTubeBundleTypeEnum",
            "ifc:IfcTrimmingPreference",
            "ifc:IfcTransportElementTypeEnum",
            "ifc:IfcTransitionCurveType",
            "ifc:IfcTransformerTypeEnum",
            "ifc:IfcDataOriginEnum",
            "ifc:IfcTimeSeriesDataTypeEnum",
            "ifc:IfcTime",
            "ifc:IfcTextTransformation",
            "ifc:IfcTextDecoration",
            "ifc:IfcTextAlignment",
            "ifc:IfcFontWeight",
            "ifc:IfcFontVariant",
            "ifc:IfcFontStyle",
            "ifc:IfcBoxAlignment",
            "ifc:IfcTextPath",
            "ifc:IfcPresentableText",
            "ifc:IfcAreaMeasure",
            "ifc:IfcTendonTypeEnum",
            "ifc:IfcTendonAnchorTypeEnum",
            "ifc:IfcPressureMeasure",
            "ifc:IfcForceMeasure",
            "ifc:IfcURIReference",
            "ifc:IfcTaskTypeEnum",
            "ifc:IfcPositiveRatioMeasure",
            "ifc:IfcTaskDurationEnum",
            "ifc:IfcInteger",
            "ifc:IfcTankTypeEnum",
            "ifc:IfcSystemFurnitureElementTypeEnum",
            "ifc:IfcSwitchingDeviceTypeEnum",
            "ifc:IfcParameterValue",
            "ifc:IfcReflectanceMethodEnum",
            "ifc:IfcReal",
            "ifc:IfcSurfaceSide",
            "ifc:IfcRatioMeasure",
            "ifc:IfcSurfaceFeatureTypeEnum",
            "ifc:IfcPreferredSurfaceCurveRepresentation",
            "ifc:IfcSubContractResourceTypeEnum",
            "ifc:IfcStructuralSurfaceActivityTypeEnum",
            "ifc:IfcStructuralSurfaceMemberTypeEnum",
            "ifc:IfcProjectedOrTrueLengthEnum",
            "ifc:IfcAnalysisTheoryTypeEnum",
            "ifc:IfcThermodynamicTemperatureMeasure",
            "ifc:IfcWarpingMomentMeasure",
            "ifc:IfcTorqueMeasure",
            "ifc:IfcCurvatureMeasure",
            "ifc:IfcPlanarForceMeasure",
            "ifc:IfcLinearMomentMeasure",
            "ifc:IfcLinearForceMeasure",
            "ifc:IfcActionSourceTypeEnum",
            "ifc:IfcActionTypeEnum",
            "ifc:IfcLoadGroupTypeEnum",
            "ifc:IfcStructuralCurveActivityTypeEnum",
            "ifc:IfcStructuralCurveMemberTypeEnum",
            "ifc:IfcAnalysisModelTypeEnum",
            "ifc:IfcGlobalOrLocalEnum",
            "ifc:IfcStairTypeEnum",
            "ifc:IfcStairFlightTypeEnum",
            "ifc:IfcStackTerminalTypeEnum",
            "ifc:IfcSpatialZoneTypeEnum",
            "ifc:IfcElementCompositionEnum",
            "ifc:IfcSpaceTypeEnum",
            "ifc:IfcSpaceHeaterTypeEnum",
            "ifc:IfcSolarDeviceTypeEnum",
            "ifc:IfcSlabTypeEnum",
            "ifc:List-IfcCompoundPlaneAngleMeasure",
            "ifc:IfcStateEnum",
            "ifc:IfcSimplePropertyTemplateTypeEnum",
            "ifc:IfcLogical",
            "ifc:IfcShadingDeviceTypeEnum",
            "ifc:IfcSensorTypeEnum",
            "ifc:IfcReinforcingBarRoleEnum",
            "ifc:IfcSectionTypeEnum",
            "ifc:IfcSanitaryTerminalTypeEnum",
            "ifc:IfcSIUnitName",
            "ifc:IfcSIPrefix",
            "ifc:IfcGloballyUniqueId",
            "ifc:IfcRoofTypeEnum",
            "ifc:IfcInternalOrExternalEnum",
            "ifc:IfcPhysicalOrVirtualEnum",
            "ifc:IfcSequenceEnum",
            "ifc:logical",
            "ifc:IfcConnectionTypeEnum",
            "ifc:IfcObjectTypeEnum",
            "ifc:IfcReinforcingMeshTypeEnum",
            "ifc:IfcReinforcingBarSurfaceEnum",
            "ifc:IfcReinforcingBarTypeEnum",
            "ifc:IfcCountMeasure",
            "ifc:IfcTimeMeasure",
            "ifc:IfcReferentTypeEnum",
            "ifc:IfcRecurrenceTypeEnum",
            "ifc:IfcRampTypeEnum",
            "ifc:IfcRampFlightTypeEnum",
            "ifc:IfcRailingTypeEnum",
            "ifc:IfcMassMeasure",
            "ifc:IfcVolumeMeasure",
            "ifc:IfcPumpTypeEnum",
            "ifc:IfcProtectiveDeviceTypeEnum",
            "ifc:IfcProtectiveDeviceTrippingUnitTypeEnum",
            "ifc:IfcCurveInterpolationEnum",
            "ifc:IfcPropertySetTemplateTypeEnum",
            "ifc:IfcProjectionElementTypeEnum",
            "ifc:IfcProjectOrderTypeEnum",
            "ifc:IfcProfileTypeEnum",
            "ifc:IfcProcedureTypeEnum",
            "ifc:IfcPlateTypeEnum",
            "ifc:IfcPipeSegmentTypeEnum",
            "ifc:IfcPipeFittingTypeEnum",
            "ifc:IfcPileTypeEnum",
            "ifc:IfcPileConstructionEnum",
            "ifc:IfcPermitTypeEnum",
            "ifc:IfcPermeableCoveringOperationEnum",
            "ifc:IfcPerformanceHistoryTypeEnum",
            "ifc:IfcTimeStamp",
            "ifc:IfcChangeActionEnum",
            "ifc:IfcOutletTypeEnum",
            "ifc:IfcOpeningElementTypeEnum",
            "ifc:IfcOccupantTypeEnum",
            "ifc:IfcObjectiveEnum",
            "ifc:IfcLogicalOperatorEnum",
            "ifc:IfcUnitEnum",
            "ifc:IfcMotorConnectionTypeEnum",
            "ifc:IfcBenchmarkEnum",
            "ifc:IfcMemberTypeEnum",
            "ifc:IfcMedicalDeviceTypeEnum",
            "ifc:IfcMechanicalFastenerTypeEnum",
            "ifc:IfcCardinalPointReference",
            "ifc:IfcLayerSetDirectionEnum",
            "ifc:IfcDirectionSenseEnum",
            "ifc:IfcPositivePlaneAngleMeasure",
            "ifc:IfcLightEmissionSourceEnum",
            "ifc:IfcLuminousFluxMeasure",
            "ifc:IfcLightDistributionCurveEnum",
            "ifc:IfcLightFixtureTypeEnum",
            "ifc:IfcLanguageId",
            "ifc:IfcLampTypeEnum",
            "ifc:IfcLaborResourceTypeEnum",
            "ifc:IfcJunctionBoxTypeEnum",
            "ifc:IfcInventoryTypeEnum",
            "ifc:IfcInterceptorTypeEnum",
            "ifc:IfcHumidifierTypeEnum",
            "ifc:IfcHeatExchangerTypeEnum",
            "ifc:IfcGridTypeEnum",
            "ifc:IfcGeometricProjectionEnum",
            "ifc:IfcDimensionCount",
            "ifc:IfcGeographicElementTypeEnum",
            "ifc:IfcFurnitureTypeEnum",
            "ifc:IfcAssemblyPlaceEnum",
            "ifc:IfcFootingTypeEnum",
            "ifc:IfcFlowMeterTypeEnum",
            "ifc:IfcFlowInstrumentTypeEnum",
            "ifc:IfcFireSuppressionTerminalTypeEnum",
            "ifc:IfcFilterTypeEnum",
            "ifc:IfcFastenerTypeEnum",
            "ifc:IfcFanTypeEnum",
            "ifc:IfcExternalSpatialElementTypeEnum",
            "ifc:IfcEventTriggerTypeEnum",
            "ifc:IfcEventTypeEnum",
            "ifc:IfcEvaporatorTypeEnum",
            "ifc:IfcEvaporativeCoolerTypeEnum",
            "ifc:IfcEngineTypeEnum",
            "ifc:IfcElementAssemblyTypeEnum",
            "ifc:IfcElectricTimeControlTypeEnum",
            "ifc:IfcElectricMotorTypeEnum",
            "ifc:IfcElectricGeneratorTypeEnum",
            "ifc:IfcElectricFlowStorageDeviceTypeEnum",
            "ifc:IfcElectricDistributionBoardTypeEnum",
            "ifc:IfcElectricApplianceTypeEnum",
            "ifc:IfcDuctSilencerTypeEnum",
            "ifc:IfcDuctSegmentTypeEnum",
            "ifc:IfcDuctFittingTypeEnum",
            "ifc:IfcDoorTypeOperationEnum",
            "ifc:IfcDoorTypeEnum",
            "ifc:IfcDoorStyleConstructionEnum",
            "ifc:IfcDoorStyleOperationEnum",
            "ifc:IfcDoorPanelPositionEnum",
            "ifc:IfcDoorPanelOperationEnum",
            "ifc:IfcDocumentStatusEnum",
            "ifc:IfcDocumentConfidentialityEnum",
            "ifc:IfcDistributionSystemEnum",
            "ifc:IfcDistributionPortTypeEnum",
            "ifc:IfcFlowDirectionEnum",
            "ifc:IfcDistributionChamberElementTypeEnum",
            "ifc:IfcDiscreteAccessoryTypeEnum",
            "xs:long",
            "ifc:IfcDerivedUnitEnum",
            "ifc:IfcDamperTypeEnum",
            "ifc:IfcCurtainWallTypeEnum",
            "ifc:IfcCrewResourceTypeEnum",
            "ifc:IfcCoveringTypeEnum",
            "ifc:IfcCostScheduleTypeEnum",
            "ifc:IfcCostItemTypeEnum",
            "ifc:IfcCoolingTowerTypeEnum",
            "ifc:IfcCooledBeamTypeEnum",
            "ifc:IfcControllerTypeEnum",
            "ifc:IfcConstructionProductResourceTypeEnum",
            "ifc:IfcConstructionMaterialResourceTypeEnum",
            "ifc:IfcConstructionEquipmentResourceTypeEnum",
            "ifc:IfcConstraintEnum",
            "ifc:IfcCondenserTypeEnum",
            "ifc:IfcCompressorTypeEnum",
            "ifc:IfcTransitionCode",
            "ifc:IfcComplexPropertyTemplateTypeEnum",
            "ifc:IfcCommunicationsApplianceTypeEnum",
            "ifc:IfcColumnTypeEnum",
            "ifc:IfcCoilTypeEnum",
            "ifc:IfcChimneyTypeEnum",
            "ifc:IfcChillerTypeEnum",
            "ifc:IfcCableSegmentTypeEnum",
            "ifc:IfcCableFittingTypeEnum",
            "ifc:IfcCableCarrierSegmentTypeEnum",
            "ifc:IfcCableCarrierFittingTypeEnum",
            "ifc:IfcBurnerTypeEnum",
            "ifc:IfcBuildingSystemTypeEnum",
            "ifc:IfcBuildingElementProxyTypeEnum",
            "ifc:IfcBuildingElementPartTypeEnum",
            "ifc:IfcBooleanOperator",
            "ifc:IfcBoilerTypeEnum",
            "ifc:IfcBeamTypeEnum",
            "ifc:IfcKnotType",
            "ifc:IfcBSplineSurfaceForm",
            "ifc:IfcBSplineCurveForm",
            "ifc:IfcAudioVisualApplianceTypeEnum",
            "ifc:IfcArithmeticOperatorEnum",
            "ifc:IfcAlignmentTypeEnum",
            "ifc:IfcAlarmTypeEnum",
            "ifc:IfcAirToAirHeatRecoveryTypeEnum",
            "ifc:IfcAirTerminalTypeEnum",
            "ifc:IfcAirTerminalBoxTypeEnum",
            "ifc:IfcAddressTypeEnum",
            "ifc:IfcActuatorTypeEnum",
            "ifc:IfcRoleEnum",
            "ifc:IfcActionRequestTypeEnum",
            "ifc:Seq-anyURI"
        ],
        "use": [
            "optional"
        ],
        "ref": [
            "ifc:arraySize",
            "ifc:cType",
            "ifc:itemType"
        ],
        "fixed": [
            "set",
            "ifc:IfcPropertySetDefinition",
            "list",
            "ifc:IfcPositiveInteger",
            "xs:long",
            "array",
            "xs:double",
            "ifc:IfcPerson",
            "ifc:IfcWorkTime",
            "list-unique",
            "ifc:IfcGridAxis",
            "ifc:IfcUnit",
            "ifc:IfcRepresentationMap",
            "ifc:IfcTrimmingSelect",
            "ifc:IfcValue",
            "ifc:IfcTextureVertex",
            "ifc:IfcSurfaceTexture",
            "ifc:IfcTextFontName-wrapper",
            "ifc:IfcIndexedTextureMap",
            "ifc:IfcTableColumn",
            "ifc:IfcTableRow",
            "ifc:IfcSurfaceStyleElementSelect",
            "ifc:IfcPcurve",
            "ifc:IfcStyleAssignmentSelect",
            "list-unique list",
            "ifc:IfcLengthMeasure-wrapper",
            "ifc:IfcStructuralLoadOrResult",
            "ifc:IfcStructuralResultGroup",
            "ifc:IfcStructuralLoadGroup",
            "ifc:IfcRelReferencedInSpatialStructure",
            "ifc:IfcRelContainedInSpatialStructure",
            "ifc:IfcShell",
            "ifc:IfcShapeModel",
            "ifc:IfcAxis2Placement3D",
            "ifc:IfcProfileDef",
            "ifc:IfcDistanceExpression",
            "ifc:IfcReinforcementBarProperties",
            "ifc:IfcResourceObjectSelect",
            "ifc:IfcRepresentationItem",
            "ifc:IfcSpatialElement",
            "ifc:IfcProduct",
            "ifc:IfcObjectDefinition",
            "ifc:IfcDistributionControlElement",
            "ifc:IfcObject",
            "ifc:IfcDefinitionSelect",
            "ifc:IfcCovering",
            "ifc:IfcElement",
            "ifc:IfcBendingParameterSelect",
            "ifc:IfcSectionReinforcementProperties",
            "ifc:IfcTimeSeriesValue",
            "ifc:IfcTimePeriod",
            "list list",
            "ifc:IfcReal-wrapper",
            "ifc:IfcPropertyTemplate",
            "ifc:IfcProperty",
            "ifc:IfcProfileProperties",
            "ifc:IfcRepresentation",
            "ifc:IfcShapeAspect",
            "ifc:IfcPresentationStyleSelect",
            "ifc:IfcPresentationStyle",
            "ifc:IfcLayeredItem",
            "ifc:IfcLabel-wrapper",
            "ifc:IfcCartesianPoint",
            "ifc:IfcIndexedPolygonalFace",
            "ifc:IfcPhysicalQuantity",
            "ifc:IfcActorRole",
            "ifc:IfcAddress",
            "ifc:IfcOrientedEdge",
            "ifc:IfcOrganization",
            "ifc:IfcConstraint",
            "ifc:IfcRelAggregates",
            "ifc:IfcRelNests",
            "ifc:IfcRelDefinesByProperties",
            "ifc:IfcMaterial",
            "ifc:IfcMaterialProfile",
            "ifc:IfcMaterialLayer",
            "ifc:IfcMaterialProperties",
            "ifc:IfcMaterialConstituent",
            "ifc:IfcClassificationSelect",
            "ifc:IfcLightDistributionData",
            "ifc:IfcIrregularTimeSeriesValue",
            "ifc:IfcSegmentIndexSelect",
            "ifc:IfcGeometricSetSelect",
            "ifc:IfcGeometricRepresentationSubContext",
            "ifc:IfcStyledItem",
            "ifc:IfcVector",
            "ifc:IfcFillStyleSelect",
            "ifc:IfcClosedShell",
            "ifc:IfcConnectedFaceSet",
            "ifc:IfcFaceBound",
            "ifc:IfcDocumentInformation",
            "ifc:IfcActorSelect",
            "ifc:IfcDerivedUnitElement",
            "ifc:IfcCurveStyleFontPattern",
            "ifc:IfcBoundaryCurve",
            "ifc:IfcCurve",
            "ifc:IfcCostValue",
            "ifc:IfcRelDeclares",
            "ifc:IfcRepresentationContext",
            "ifc:IfcAppliedValue",
            "ifc:IfcFace",
            "ifc:IfcCompositeCurveSegment",
            "ifc:IfcClassificationReference",
            "ifc:IfcIdentifier-wrapper",
            "ifc:IfcApproval",
            "ifc:IfcAlignment2DVerticalSegment",
            "ifc:IfcAlignment2DHorizontalSegment"
        ]
    }
}