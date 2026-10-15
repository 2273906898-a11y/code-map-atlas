window.ATLAS_PROJECT_MAPS = [
{
  "schemaVersion": 2,
  "id": "attendance-tool",
  "sourceKey": "attendance-tool",
  "name": "考勤异常处理系统",
  "version": "v41",
  "checkedAt": "2026-10-15",
  "status": "mapped",
  "releaseState": "交接记录版本；未与线上核验",
  "reportedStableVersion": "v41",
  "description": "每月先导入 EHR 原始月报和打卡明细，由 BP 核对异常与特殊人员调整，最后生成可复核的最终考勤月报。",
  "verification": "根据本地源码只读扫描生成。交接摘要称线上稳定版本为 v41；本次未查询部署平台或访问生产库，不能据此确认本地代码与线上完全一致。49 项测试仅识别到文件，未重新执行。",
  "modules": [
    {
      "name": "数据导入与月份",
      "audience": "考勤管理员",
      "description": "分别接收月报和打卡异常文件，为每月处理建立底稿。",
      "attention": "重复导入需保留已处理结果和手工日期；历史月份不可误删除。",
      "dependsOn": [
        "数据与运行保障"
      ],
      "features": [
        {
          "name": "EHR 月报独立导入",
          "description": "上传月报并保存原始人员、组织、出勤、旷工和扣款字段。",
          "status": "已识别"
        },
        {
          "name": "打卡异常独立导入",
          "description": "上传异常明细并关联员工、日期和异常说明。",
          "status": "已识别"
        },
        {
          "name": "Excel 读取与表头校验",
          "description": "解析工作表内容并验证必要字段；不是读取任意版式或图片。",
          "status": "已识别"
        },
        {
          "name": "月报异常总表生成",
          "description": "从月报筛出旷工或迟到早退扣款异常，应用白名单后整理。",
          "status": "已识别"
        },
        {
          "name": "重新导入保留处理结果",
          "description": "重传月报时衔接已有异常处理和人工日期，避免覆盖后续核对。",
          "status": "已识别"
        },
        {
          "name": "月份列表与默认最新月份",
          "description": "从持久化数据读取已有月份，默认最新月份，导入后切换。",
          "status": "已识别"
        }
      ],
      "status": "已识别"
    },
    {
      "name": "BP 异常工作台",
      "audience": "BP 与考勤处理人员",
      "description": "按人员汇总异常，再展开到每一条打卡记录。",
      "attention": "页面筛选不是身份授权；金额与旷工变化需核对底稿。",
      "dependsOn": [
        "数据导入与月份",
        "BP 归属映射",
        "异常计算与月报基线"
      ],
      "features": [
        {
          "name": "一人一行月度汇总",
          "description": "汇总人员的月度扣款、旷工天数、异常数量和处理状态。",
          "status": "已识别"
        },
        {
          "name": "逐条异常详情",
          "description": "展开日期、真实异常原因、补签和审批备注，保留处理粒度。",
          "status": "已识别"
        },
        {
          "name": "BP 与状态筛选",
          "description": "按月份、BP 以及待处理、已消除、已保留等状态筛选。",
          "status": "已识别"
        },
        {
          "name": "整天旷工分组展示",
          "description": "前端将连续整天旷工合并展示，展开后仍逐日处理。",
          "status": "已识别"
        },
        {
          "name": "公出出差和审批说明",
          "description": "区分公出出差未打卡、普通缺卡和审批状态，附原始备注。",
          "status": "已识别"
        },
        {
          "name": "最后工作日与发薪日编辑",
          "description": "编辑日期后同步到月报和异常记录，并验证日历日期。",
          "status": "已识别"
        }
      ],
      "status": "已识别"
    },
    {
      "name": "异常处理与撤回",
      "audience": "BP 与复核人员",
      "description": "执行消除、保留、批量处理和有原因的撤回，留下处理记录。",
      "attention": "普通 BP 撤回不能覆盖 SSC 清除；处理后须重算汇总。",
      "dependsOn": [
        "BP 异常工作台",
        "异常计算与月报基线",
        "审计与处理记录"
      ],
      "features": [
        {
          "name": "单条消除或保留",
          "description": "对具体异常执行处理意见，并重算员工月度结果。",
          "status": "已识别"
        },
        {
          "name": "明细多选批量处理",
          "description": "对选中的异常明细批量消除或保留。",
          "status": "已识别"
        },
        {
          "name": "按人员批量消除",
          "description": "选择人员后一次处理其全部待处理普通异常。",
          "status": "已识别"
        },
        {
          "name": "撤回已消除异常",
          "description": "填写操作人与原因，将普通已消除项恢复待处理并重算。",
          "status": "已识别"
        },
        {
          "name": "撤回已保留异常",
          "description": "v41 交接版本新增的撤回保留能力，同样要求原因并保留审计。",
          "status": "已识别"
        },
        {
          "name": "SSC 清除与争议复核",
          "description": "后端仍保留独立 SSC 清除和争议处理路径；不等于应展示独立页面。",
          "status": "已识别"
        }
      ],
      "status": "已识别"
    },
    {
      "name": "白名单与人员豁免",
      "audience": "共同维护人员",
      "description": "维护不进入异常处理队列的人员与系统自动豁免规则。",
      "attention": "停用或删除后需要恢复原始异常；自动豁免不能被手工替换意外关闭。",
      "dependsOn": [
        "数据导入与月份",
        "异常计算与月报基线"
      ],
      "features": [
        {
          "name": "白名单新增编辑与状态管理",
          "description": "支持新增、编辑、启停和删除白名单记录。",
          "status": "已识别"
        },
        {
          "name": "同名与组织匹配",
          "description": "按人员与组织匹配，姓名兜底只在无歧义时使用。",
          "status": "已识别"
        },
        {
          "name": "豁免与原始异常恢复",
          "description": "变更白名单后刷新异常总表与工作台，取消豁免时恢复基线。",
          "status": "已识别"
        },
        {
          "name": "指定部门实习生自动豁免",
          "description": "自动维护符合组织和雇佣关系条件的实习生豁免。",
          "status": "已识别"
        }
      ],
      "status": "已识别"
    },
    {
      "name": "特殊人员出勤提报",
      "audience": "负责对应人员范围的 BP",
      "description": "外部人员、实习生分别提报工作天数，并回填月报。",
      "attention": "特殊人员名单有范围限制；外部扣款字段仍存在，与最新只报天数口径需核对。",
      "dependsOn": [
        "白名单与人员豁免",
        "数据导入与月份",
        "最终月报与导出"
      ],
      "features": [
        {
          "name": "实习生名单与部门批选",
          "description": "按限定部门和人员类型生成名单，支持组织批量选择。",
          "status": "已识别"
        },
        {
          "name": "实习生出勤天数提报",
          "description": "批量保存实际出勤天数，最终月报以提报值覆盖。",
          "status": "已识别"
        },
        {
          "name": "外部人员独立提报",
          "description": "对限定范围内的外部人员单独保存天数，不放入普通异常队列。",
          "status": "已识别"
        },
        {
          "name": "提报修改与删除",
          "description": "通过后台接口修改或删除提报记录，并反映到月报。",
          "status": "已识别"
        },
        {
          "name": "外部人员扣款字段兼容",
          "description": "旧提报接口仍支持扣款；是否继续使用需按最新业务口径确认。",
          "status": "已识别"
        }
      ],
      "status": "已识别"
    },
    {
      "name": "离职调休与法定加班",
      "audience": "BP 与考勤管理员",
      "description": "管理离职折算和法定节假日加班，为实际出勤增加调整天数。",
      "attention": "小时和天数不能混用，折算结果须按业务口径验收。",
      "dependsOn": [
        "数据导入与月份",
        "最终月报与导出"
      ],
      "features": [
        {
          "name": "离职人员名单导入",
          "description": "导入离职人员及可用的调休、假期信息。",
          "status": "已识别"
        },
        {
          "name": "离职名单与折算查询",
          "description": "按月份和 BP 查询离职人员及离职调休折算记录。",
          "status": "已识别"
        },
        {
          "name": "离职调休折算维护",
          "description": "保存、修改、删除离职折算记录，结果增加到最终出勤。",
          "status": "已识别"
        },
        {
          "name": "法定加班独立提报",
          "description": "独立维护法定加班时长及折算天数，并加入最终出勤。",
          "status": "已识别"
        }
      ],
      "status": "已识别"
    },
    {
      "name": "BP 归属映射",
      "audience": "考勤管理员",
      "description": "为组织匹配负责 BP，并刷新历史导入人员的归属。",
      "attention": "包含特殊组织优先规则；映射变化应核对已有人员范围。",
      "dependsOn": [
        "数据导入与月份"
      ],
      "features": [
        {
          "name": "组织分级匹配",
          "description": "先按二三级组织匹配，再按二级组织，最后使用原 EHR BP 兜底。",
          "status": "已识别"
        },
        {
          "name": "特殊组织优先规则",
          "description": "指定组织固定归属优先于一般映射；地图中不记录真实负责人姓名。",
          "status": "已识别"
        },
        {
          "name": "映射维护与历史刷新",
          "description": "系统保存映射，并按最新映射刷新已导入月报和异常记录。",
          "status": "已识别"
        }
      ],
      "status": "已识别"
    },
    {
      "name": "异常计算与月报基线",
      "audience": "系统自动计算，BP 核对",
      "description": "把明细处理结果回算到 EHR 月报基线，得到最终旷工和扣款。",
      "attention": "这些是当前代码规则，不代表已与真实工资结果完成复核。",
      "dependsOn": [
        "数据导入与月份",
        "白名单与人员豁免"
      ],
      "features": [
        {
          "name": "迟到早退影响计算",
          "description": "按代码口径计算迟到早退分钟对应扣款。",
          "status": "已识别"
        },
        {
          "name": "明细回算与 EHR 封顶",
          "description": "根据仍生效的明细回算，扣款和旷工不超过原月报基线。",
          "status": "已识别"
        },
        {
          "name": "实际出勤公式",
          "description": "以应出勤扣除入离职缺勤、事假、旷工和病假折算，叠加特殊调整。",
          "status": "已识别"
        },
        {
          "name": "历史基线兼容恢复",
          "description": "修复旧月报基线并衔接已有审核状态。",
          "status": "已识别"
        },
        {
          "name": "指定核对结果一次性修正",
          "description": "存在针对既定月份和人员的定向、可审计迁移，使用标记避免重复执行；不公开人员信息。",
          "status": "已识别"
        }
      ],
      "status": "已识别"
    },
    {
      "name": "最终月报与导出",
      "audience": "考勤管理员与 BP",
      "description": "导出两类异常总表和保留 EHR 原字段的最终考勤月报。",
      "attention": "导出前需核对人数、旷工、扣款、调整天数和关键日期。",
      "dependsOn": [
        "异常计算与月报基线",
        "特殊人员出勤提报",
        "离职调休与法定加班"
      ],
      "features": [
        {
          "name": "月报异常总表 Excel",
          "description": "导出供 BP 核对的月报异常人员及原始字段。",
          "status": "已识别"
        },
        {
          "name": "打卡异常总表 Excel",
          "description": "导出真实日期、异常原因、补签公出备注和处理状态。",
          "status": "已识别"
        },
        {
          "name": "最终月报保留原字段",
          "description": "保留源月报的表头与字段，回填最终出勤、旷工、扣款和日期。",
          "status": "已识别"
        },
        {
          "name": "特殊调整并入月报",
          "description": "把实习生、外部人员、离职折算和法定加班结果并入月报。",
          "status": "已识别"
        },
        {
          "name": "数值日期单元格与兼容导出",
          "description": "生成 Excel 数值和日期单元格；代码仍保留 CSV 和旧结果导出能力。",
          "status": "已识别"
        }
      ],
      "status": "已识别"
    },
    {
      "name": "BP 核对表与后续集成",
      "audience": "考勤管理员",
      "description": "区分已实现的明确天数读取与尚未实现的意见自动结构化。",
      "attention": "不能把自然语言意见直接猜成清除结果，也不能宣称已连接外部人事系统。",
      "dependsOn": [
        "数据导入与月份",
        "异常处理与撤回",
        "审计与处理记录"
      ],
      "features": [
        {
          "name": "BP 核对表明确天数读取",
          "description": "仅提取已明确标注的实习生、法定加班和离职调休天数。",
          "status": "已识别"
        },
        {
          "name": "核对表天数调整入库",
          "description": "保存可读取的天数调整，用于最终月报；不是通用文字意见执行。",
          "status": "已识别"
        },
        {
          "name": "文字意见解析与确认预览",
          "description": "规划把处理意见转换为结构化动作，先预览确认，再执行并审计。",
          "status": "待开发"
        },
        {
          "name": "北森实时同步",
          "description": "尚未发现集成实现；接口权限和凭据未接入，不标为已上线。",
          "status": "待开发"
        }
      ],
      "status": "已识别"
    },
    {
      "name": "审计与处理记录",
      "audience": "BP、复核人员与管理员",
      "description": "保留异常状态、日期和处理意见的历史记录。",
      "attention": "手填操作人不等于可信登录身份。",
      "dependsOn": [
        "数据与运行保障"
      ],
      "features": [
        {
          "name": "异常处理审计",
          "description": "记录明细消除、保留、撤回、SSC 相关处理。",
          "status": "已识别"
        },
        {
          "name": "人员汇总与日期审计",
          "description": "记录人员汇总变化、手工日期和月报调整。",
          "status": "已识别"
        },
        {
          "name": "导入与批次记录",
          "description": "保存导入来源和批次结果，供后续核对。",
          "status": "已识别"
        }
      ],
      "status": "已识别"
    },
    {
      "name": "数据与运行保障",
      "audience": "维护人员",
      "description": "Python 标准库 Web 服务和 SQLite 持久化，附业务回归测试。",
      "attention": "本次只读分析，未启动应用、未访问生产数据，也未执行原项目测试。",
      "dependsOn": [],
      "features": [
        {
          "name": "SQLite 数据与兼容迁移",
          "description": "按配置连接持久化库，通过幂等建表补列维持兼容。",
          "status": "已识别"
        },
        {
          "name": "健康检查与上传边界",
          "description": "提供健康检查，并限制上传文件大小、校验输入；不代表完整权限保护。",
          "status": "已识别"
        },
        {
          "name": "业务自动化测试",
          "description": "测试文件中存在 49 项业务场景，本次未运行，不能继承历史通过结论。",
          "status": "已识别"
        },
        {
          "name": "旧页面与覆盖脚本遗留",
          "description": "单文件中仍有仪表盘、SSC 和旧工作簿逻辑，多层覆盖脚本隐藏部分入口；移除需另行核查。",
          "status": "已识别"
        },
        {
          "name": "登录与权限保护缺口",
          "description": "当前源码路由未见会话、登录或基于角色的后端授权检查；平台层保护尚未核实。",
          "status": "已识别"
        }
      ],
      "status": "已识别"
    }
  ],
  "relationships": [
    [
      "数据与运行保障",
      "数据导入与月份"
    ],
    [
      "数据导入与月份",
      "BP 异常工作台"
    ],
    [
      "BP 归属映射",
      "BP 异常工作台"
    ],
    [
      "异常计算与月报基线",
      "BP 异常工作台"
    ],
    [
      "BP 异常工作台",
      "异常处理与撤回"
    ],
    [
      "异常计算与月报基线",
      "异常处理与撤回"
    ],
    [
      "审计与处理记录",
      "异常处理与撤回"
    ],
    [
      "数据导入与月份",
      "白名单与人员豁免"
    ],
    [
      "异常计算与月报基线",
      "白名单与人员豁免"
    ],
    [
      "白名单与人员豁免",
      "特殊人员出勤提报"
    ],
    [
      "数据导入与月份",
      "特殊人员出勤提报"
    ],
    [
      "最终月报与导出",
      "特殊人员出勤提报"
    ],
    [
      "数据导入与月份",
      "离职调休与法定加班"
    ],
    [
      "最终月报与导出",
      "离职调休与法定加班"
    ],
    [
      "数据导入与月份",
      "BP 归属映射"
    ],
    [
      "数据导入与月份",
      "异常计算与月报基线"
    ],
    [
      "白名单与人员豁免",
      "异常计算与月报基线"
    ],
    [
      "异常计算与月报基线",
      "最终月报与导出"
    ],
    [
      "特殊人员出勤提报",
      "最终月报与导出"
    ],
    [
      "离职调休与法定加班",
      "最终月报与导出"
    ],
    [
      "数据导入与月份",
      "BP 核对表与后续集成"
    ],
    [
      "异常处理与撤回",
      "BP 核对表与后续集成"
    ],
    [
      "审计与处理记录",
      "BP 核对表与后续集成"
    ],
    [
      "数据与运行保障",
      "审计与处理记录"
    ]
  ],
  "featureCount": 56,
  "plannedCount": 2,
  "testCount": 49,
  "mapBacklog": "补齐 BP 文字处理意见的结构化预览、确认、幂等执行和审计。\n\n交接记录中的最终月报人数、金额、日期和特殊调整需在另行授权后完整复核。\n\n核实平台外围认证；源码中没有发现后端登录和角色授权。\n\n核查旧仪表盘、SSC 和合并工作簿页面与接口的残留，不以隐藏导航视作删除。\n\n确认外部人员仅报天数的最新口径；旧接口仍保留扣款。\n\n北森集成尚未接入。",
  "mapRisks": "重复导入需保留已处理结果和手工日期；历史月份不可误删除。\n\n页面筛选不是身份授权；金额与旷工变化需核对底稿。\n\n普通 BP 撤回不能覆盖 SSC 清除；处理后须重算汇总。\n\n停用或删除后需要恢复原始异常；自动豁免不能被手工替换意外关闭。\n\n特殊人员名单有范围限制；外部扣款字段仍存在，与最新只报天数口径需核对。\n\n小时和天数不能混用，折算结果须按业务口径验收。\n\n包含特殊组织优先规则；映射变化应核对已有人员范围。\n\n这些是当前代码规则，不代表已与真实工资结果完成复核。\n\n导出前需核对人数、旷工、扣款、调整天数和关键日期。\n\n不能把自然语言意见直接猜成清除结果，也不能宣称已连接外部人事系统。\n\n手填操作人不等于可信登录身份。\n\n本次只读分析，未启动应用、未访问生产数据，也未执行原项目测试。",
  "backlog": "",
  "url": "",
  "framework": {
    "description": "每月先导入 EHR 原始月报和打卡明细，由 BP 核对异常与特殊人员调整，最后生成可复核的最终考勤月报。",
    "sections": [
      {
        "title": "月度考勤的主流程",
        "audience": "BP 与考勤管理员",
        "pages": [
          {
            "name": "数据导入与导入记录",
            "purpose": "两份 EHR 文件分别上传，选定本月底稿",
            "group": "数据导入与月份",
            "items": [
              {
                "text": "EHR 月报独立导入",
                "feature": "EHR 月报独立导入",
                "planned": false
              },
              {
                "text": "打卡异常独立导入",
                "feature": "打卡异常独立导入",
                "planned": false
              },
              {
                "text": "Excel 读取与表头校验",
                "feature": "Excel 读取与表头校验",
                "planned": false
              },
              {
                "text": "月份列表与默认最新月份",
                "feature": "月份列表与默认最新月份",
                "planned": false
              }
            ],
            "note": "已在代码中识别；本次未实际上传文件或核对生产导入批次。"
          },
          {
            "name": "BP 异常工作台",
            "purpose": "一人一行查看，再展开到逐条异常",
            "group": "BP 异常工作台",
            "items": [
              {
                "text": "一人一行月度汇总",
                "feature": "一人一行月度汇总",
                "planned": false
              },
              {
                "text": "逐条异常详情",
                "feature": "逐条异常详情",
                "planned": false
              },
              {
                "text": "BP 与状态筛选",
                "feature": "BP 与状态筛选",
                "planned": false
              },
              {
                "text": "公出出差和审批说明",
                "feature": "公出出差和审批说明",
                "planned": false
              },
              {
                "text": "最后工作日与发薪日编辑",
                "feature": "最后工作日与发薪日编辑",
                "planned": false
              }
            ],
            "note": "名称表示业务分工；按 BP 筛选不等于已实现登录权限隔离。"
          },
          {
            "name": "异常处理与撤回",
            "purpose": "消除或保留，处理错误可以留痕撤回",
            "group": "异常处理与撤回",
            "items": [
              {
                "text": "单条消除或保留",
                "feature": "单条消除或保留",
                "planned": false
              },
              {
                "text": "明细多选批量处理",
                "feature": "明细多选批量处理",
                "planned": false
              },
              {
                "text": "按人员批量消除",
                "feature": "按人员批量消除",
                "planned": false
              },
              {
                "text": "撤回已消除异常",
                "feature": "撤回已消除异常",
                "planned": false
              },
              {
                "text": "撤回已保留异常",
                "feature": "撤回已保留异常",
                "planned": false
              }
            ],
            "note": "SSC 处理后端仍存在，普通 BP 撤回不能覆盖它。"
          },
          {
            "name": "导出与最终月报",
            "purpose": "保留原表字段并回填核对后的结果",
            "group": "最终月报与导出",
            "items": [
              {
                "text": "月报异常总表 Excel",
                "feature": "月报异常总表 Excel",
                "planned": false
              },
              {
                "text": "打卡异常总表 Excel",
                "feature": "打卡异常总表 Excel",
                "planned": false
              },
              {
                "text": "最终月报保留原字段",
                "feature": "最终月报保留原字段",
                "planned": false
              },
              {
                "text": "特殊调整并入月报",
                "feature": "特殊调整并入月报",
                "planned": false
              }
            ],
            "note": "交接资料说明：v41 后尚未完成与正确月报的完整逐人复核。"
          }
        ]
      },
      {
        "title": "共同维护与特殊调整",
        "audience": "具体业务入口",
        "pages": [
          {
            "name": "白名单管理",
            "purpose": "豁免无需进入异常工作台的人员",
            "group": "白名单与人员豁免",
            "items": [
              {
                "text": "白名单新增编辑与状态管理",
                "feature": "白名单新增编辑与状态管理",
                "planned": false
              },
              {
                "text": "同名与组织匹配",
                "feature": "同名与组织匹配",
                "planned": false
              },
              {
                "text": "豁免与原始异常恢复",
                "feature": "豁免与原始异常恢复",
                "planned": false
              },
              {
                "text": "指定部门实习生自动豁免",
                "feature": "指定部门实习生自动豁免",
                "planned": false
              }
            ],
            "note": "地图不收录真实白名单姓名或工号。"
          },
          {
            "name": "实习生与外部人员提报",
            "purpose": "单独提报工作天数，结果并入月报",
            "group": "特殊人员出勤提报",
            "items": [
              {
                "text": "实习生名单与部门批选",
                "feature": "实习生名单与部门批选",
                "planned": false
              },
              {
                "text": "实习生出勤天数提报",
                "feature": "实习生出勤天数提报",
                "planned": false
              },
              {
                "text": "外部人员独立提报",
                "feature": "外部人员独立提报",
                "planned": false
              },
              {
                "text": "外部人员扣款字段兼容",
                "feature": "外部人员扣款字段兼容",
                "planned": false
              }
            ],
            "note": "按真实人员范围限定；外部扣款旧能力与最新只报天数口径有待统一。"
          },
          {
            "name": "离职调休与法定加班",
            "purpose": "补充影响实际出勤天数的折算",
            "group": "离职调休与法定加班",
            "items": [
              {
                "text": "离职人员名单导入",
                "feature": "离职人员名单导入",
                "planned": false
              },
              {
                "text": "离职名单与折算查询",
                "feature": "离职名单与折算查询",
                "planned": false
              },
              {
                "text": "离职调休折算维护",
                "feature": "离职调休折算维护",
                "planned": false
              },
              {
                "text": "法定加班独立提报",
                "feature": "法定加班独立提报",
                "planned": false
              }
            ],
            "note": "实际小时与天数口径须由业务验收，不在地图中猜测。"
          }
        ]
      },
      {
        "title": "管理配置、留痕与后续规划",
        "audience": "管理与维护",
        "pages": [
          {
            "name": "BP 映射",
            "purpose": "按组织找到负责 BP",
            "group": "BP 归属映射",
            "items": [
              {
                "text": "组织分级匹配",
                "feature": "组织分级匹配",
                "planned": false
              },
              {
                "text": "特殊组织优先规则",
                "feature": "特殊组织优先规则",
                "planned": false
              },
              {
                "text": "映射维护与历史刷新",
                "feature": "映射维护与历史刷新",
                "planned": false
              }
            ],
            "note": "不在对外展示地图中记录真实负责人。"
          },
          {
            "name": "操作审计与导入批次",
            "purpose": "追溯是谁在何时处理了什么",
            "group": "审计与处理记录",
            "items": [
              {
                "text": "异常处理审计",
                "feature": "异常处理审计",
                "planned": false
              },
              {
                "text": "人员汇总与日期审计",
                "feature": "人员汇总与日期审计",
                "planned": false
              },
              {
                "text": "导入与批次记录",
                "feature": "导入与批次记录",
                "planned": false
              }
            ],
            "note": "现有手填操作人字段不能替代可靠的身份认证。"
          },
          {
            "name": "BP 核对表与北森集成",
            "purpose": "明确现状，再展示后续补齐方向",
            "group": "BP 核对表与后续集成",
            "items": [
              {
                "text": "BP 核对表明确天数读取",
                "feature": "BP 核对表明确天数读取",
                "planned": false
              },
              {
                "text": "核对表天数调整入库",
                "feature": "核对表天数调整入库",
                "planned": false
              },
              {
                "text": "文字意见解析与确认预览",
                "feature": "文字意见解析与确认预览",
                "planned": true
              },
              {
                "text": "北森实时同步",
                "feature": "北森实时同步",
                "planned": true
              }
            ],
            "note": "文字意见执行与北森同步均属于待开发，不计入已实现功能。"
          },
          {
            "name": "运行与风险",
            "purpose": "数据兼容、回归测试与权限缺口",
            "group": "数据与运行保障",
            "items": [
              {
                "text": "SQLite 数据与兼容迁移",
                "feature": "SQLite 数据与兼容迁移",
                "planned": false
              },
              {
                "text": "业务自动化测试",
                "feature": "业务自动化测试",
                "planned": false
              },
              {
                "text": "旧页面与覆盖脚本遗留",
                "feature": "旧页面与覆盖脚本遗留",
                "planned": false
              },
              {
                "text": "登录与权限保护缺口",
                "feature": "登录与权限保护缺口",
                "planned": false
              }
            ],
            "note": "代码功能识别不等于线上验收，尤其需要核实员工数据的访问保护。"
          }
        ]
      }
    ]
  },
  "sourceFingerprint": "368657c1852715f0680f9058d238beae4a7a8e77d8c9b31cfc2b5f1ef6ae13e8",
  "mapDigest": "746f338506bd9466d65751608ce4027954f0e327b1f2a5269d9980540031ff09"
}
];
