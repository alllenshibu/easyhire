const prisma = require("../db");

const getAllGroups = async (req, res) => {
  try {
    let groups = await prisma.groups.findMany({
      include: {
        groupMembers: {
          include: {
            user: true,
          },
        },
      },
    });

    for (let group of groups) {
      group.members = [];

      for (let member of group.groupMembers) {
        group.members.push(member.user);
      }

      group.numberOfMembers = group.groupMembers.length;
    }

    return res.status(200).json({ groups });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getGroupById = async (req, res) => {
  try {
    const { groupId } = req.params;

    let group = await prisma.groups.findUnique({
      where: {
        id: groupId,
      },
      include: {
        groupMembers: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    group.members = [];

    for (let member of group.groupMembers) {
      group.members.push(member.user);
    }

    group.numberOfMembers = group.groupMembers.length;

    return res.status(200).json({ group });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const createNewGroup = async (req, res) => {
  try {
    const { name, members } = req.body;

    const group = await prisma.groups.create({
      data: {
        name,
      },
    });

    return res.status(200).json({ group });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const addMembersToGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { members } = req.body;

    const group = await prisma.groups.findUnique({
      where: {
        id: groupId,
      },
    });

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    let membersNotAdded = [];

    for (let member of members) {
      const user = await prisma.users.findUnique({
        where: {
          id: member,
        },
      });

      if (!user) {
        membersNotAdded.push(member);
      }

      const groupMember = await prisma.groupMembers.create({
        data: {
          groupId,
          userId: member,
        },
      });

      if (!groupMember) {
        return res.status(500).json({ error: "Failed to add member" });
      }
    }

    return res.status(200).json(() => {
      membersNotAdded.length > 0 ? { membersNotAdded } : {};
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  getAllGroups,
  getGroupById,
  createNewGroup,
};
